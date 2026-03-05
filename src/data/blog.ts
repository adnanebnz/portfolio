import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { prisma } from "@/lib/prisma";

export type BlogPostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string | null;
};

export type BlogPost = {
  source: string;
  metadata: BlogPostMetadata;
  slug: string;
  // Full DB post for localization
  dbPost?: {
    titleEn: string;
    titleFr: string;
    summaryEn: string | null;
    summaryFr: string | null;
    contentEn: string;
    contentFr: string;
    coverImage: string | null;
    tags: string[];
  };
};

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(
  slug: string,
  locale: string = "en"
): Promise<BlogPost | null> {
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!dbPost || !dbPost.published) {
      return null;
    }

    // Select content based on locale
    const content = locale === "fr" ? dbPost.contentFr : dbPost.contentEn;
    const title = locale === "fr" ? dbPost.titleFr : dbPost.titleEn;
    const summary = locale === "fr" ? dbPost.summaryFr : dbPost.summaryEn;

    const htmlContent = await markdownToHTML(content);

    return {
      source: htmlContent,
      metadata: {
        title,
        publishedAt:
          dbPost.publishedAt?.toISOString() || dbPost.createdAt.toISOString(),
        summary: summary || "",
        image: dbPost.coverImage,
      },
      slug: dbPost.slug,
      dbPost: {
        titleEn: dbPost.titleEn,
        titleFr: dbPost.titleFr,
        summaryEn: dbPost.summaryEn,
        summaryFr: dbPost.summaryFr,
        contentEn: dbPost.contentEn,
        contentFr: dbPost.contentFr,
        coverImage: dbPost.coverImage,
        tags: dbPost.tags,
      },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });

    const blogPosts = await Promise.all(
      posts.map(async (post) => {
        const content = locale === "fr" ? post.contentFr : post.contentEn;
        const title = locale === "fr" ? post.titleFr : post.titleEn;
        const summary = locale === "fr" ? post.summaryFr : post.summaryEn;

        const htmlContent = await markdownToHTML(content);

        return {
          source: htmlContent,
          metadata: {
            title,
            publishedAt:
              post.publishedAt?.toISOString() || post.createdAt.toISOString(),
            summary: summary || "",
            image: post.coverImage,
          },
          slug: post.slug,
          dbPost: {
            titleEn: post.titleEn,
            titleFr: post.titleFr,
            summaryEn: post.summaryEn,
            summaryFr: post.summaryFr,
            contentEn: post.contentEn,
            contentFr: post.contentFr,
            coverImage: post.coverImage,
            tags: post.tags,
          },
        };
      })
    );

    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
