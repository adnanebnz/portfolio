import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const posts = await getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="container mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Blog
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                My thoughts on software development, life, and more.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mt-8 rounded-full"></div>
            </div>
          </BlurFade>

          {/* Blog Posts Grid */}
          <div className="grid gap-8">
            {posts
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post, id) => (
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                  key={post.slug}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group relative p-8 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        {/* Post Title */}
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.metadata.title}
                        </h2>

                        {/* Post Summary */}
                        {post.metadata.summary && (
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                            {post.metadata.summary}
                          </p>
                        )}

                        {/* Post Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <time dateTime={post.metadata.publishedAt}>
                                {new Date(
                                  post.metadata.publishedAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>5 min read</span>
                            </div>
                          </div>

                          {/* Read More Arrow */}
                          <div className="flex items-center space-x-1 text-primary group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-medium">
                              Read more
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </BlurFade>
              ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">
                  Stay tuned for upcoming blog posts and insights.
                </p>
              </div>
            </BlurFade>
          )}
        </div>
      </section>
    </div>
  );
}
