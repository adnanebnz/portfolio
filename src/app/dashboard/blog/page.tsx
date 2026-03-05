"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Eye,
  EyeOff,
  Loader2,
  Calendar,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ImageUpload } from "@/components/image-upload";
import {
  useBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from "@/hooks/use-api";
import { ShimmerGrid } from "@/components/ui/shimmer";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string | null;
  summaryFr: string | null;
  contentEn: string;
  contentFr: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  tags: string[];
}

export default function BlogManagerPage() {
  const { data: posts, isLoading, error } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "fr">("en");
  const [form, setForm] = useState({
    slug: "",
    titleEn: "",
    titleFr: "",
    summaryEn: "",
    summaryFr: "",
    contentEn: "",
    contentFr: "",
    coverImage: "",
    published: false,
    tags: "",
  });

  const resetForm = () => {
    setForm({
      slug: "",
      titleEn: "",
      titleFr: "",
      summaryEn: "",
      summaryFr: "",
      contentEn: "",
      contentFr: "",
      coverImage: "",
      published: false,
      tags: "",
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      slug: post.slug,
      titleEn: post.titleEn,
      titleFr: post.titleFr,
      summaryEn: post.summaryEn || "",
      summaryFr: post.summaryFr || "",
      contentEn: post.contentEn,
      contentFr: post.contentFr,
      coverImage: post.coverImage || "",
      published: post.published,
      tags: post.tags.join(", "),
    });
    setFormOpen(true);
  };

  const handleSubmit = async () => {
    const data = {
      slug: form.slug,
      titleEn: form.titleEn,
      titleFr: form.titleFr,
      summaryEn: form.summaryEn,
      summaryFr: form.summaryFr,
      contentEn: form.contentEn,
      contentFr: form.contentFr,
      coverImage: form.coverImage || null,
      published: form.published,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingPost) {
        await updatePost.mutateAsync({ id: editingPost.id, ...data });
        toast.success("Blog post updated!");
      } else {
        await createPost.mutateAsync(data);
        toast.success("Blog post created!");
      }
      setFormOpen(false);
      resetForm();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await deletePost.mutateAsync(id);
      toast.success("Blog post deleted!");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await updatePost.mutateAsync({
        id: post.id,
        published: !post.published,
      });
      toast.success(post.published ? "Post unpublished" : "Post published!");
    } catch {
      toast.error("Failed to update post");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-destructive">
          Failed to load blog posts. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Manager</h1>
            <p className="text-muted-foreground">
              Create and manage your blog posts with Markdown
            </p>
          </div>
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? "Edit" : "Create"} Blog Post
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={form.slug}
                      onChange={(e) =>
                        setForm({ ...form, slug: e.target.value })
                      }
                      placeholder="my-blog-post"
                    />
                    {form.titleEn && !form.slug && (
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="px-0 h-auto text-xs"
                        onClick={() =>
                          setForm({
                            ...form,
                            slug: generateSlug(form.titleEn),
                          })
                        }
                      >
                        Generate from title
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={form.tags}
                      onChange={(e) =>
                        setForm({ ...form, tags: e.target.value })
                      }
                      placeholder="react, nextjs, tutorial"
                    />
                  </div>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <Input
                        value={form.coverImage}
                        onChange={(e) =>
                          setForm({ ...form, coverImage: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <ImageUpload
                      folder="blog"
                      onUpload={(url) => setForm({ ...form, coverImage: url })}
                      currentImage={form.coverImage}
                      className="w-32"
                      aspectRatio="video"
                    />
                  </div>
                </div>

                {/* Language Tabs */}
                <Tabs
                  value={activeLanguage}
                  onValueChange={(v) => setActiveLanguage(v as "en" | "fr")}
                >
                  <TabsList>
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                    <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
                  </TabsList>

                  <TabsContent value="en" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Title (English)</Label>
                      <Input
                        value={form.titleEn}
                        onChange={(e) =>
                          setForm({ ...form, titleEn: e.target.value })
                        }
                        placeholder="My Awesome Blog Post"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Summary (English)</Label>
                      <Input
                        value={form.summaryEn}
                        onChange={(e) =>
                          setForm({ ...form, summaryEn: e.target.value })
                        }
                        placeholder="A brief description..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (English)</Label>
                      <MarkdownEditor
                        value={form.contentEn}
                        onChange={(v) => setForm({ ...form, contentEn: v })}
                        placeholder="Write your blog post in Markdown..."
                        minHeight="300px"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="fr" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Title (French)</Label>
                      <Input
                        value={form.titleFr}
                        onChange={(e) =>
                          setForm({ ...form, titleFr: e.target.value })
                        }
                        placeholder="Mon Super Article de Blog"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Summary (French)</Label>
                      <Input
                        value={form.summaryFr}
                        onChange={(e) =>
                          setForm({ ...form, summaryFr: e.target.value })
                        }
                        placeholder="Une brève description..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (French)</Label>
                      <MarkdownEditor
                        value={form.contentFr}
                        onChange={(v) => setForm({ ...form, contentFr: v })}
                        placeholder="Écrivez votre article en Markdown..."
                        minHeight="300px"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Publish Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      createPost.isPending ||
                      updatePost.isPending ||
                      !form.slug ||
                      !form.titleEn ||
                      !form.contentEn
                    }
                  >
                    {(createPost.isPending || updatePost.isPending) && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {editingPost ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <ShimmerGrid count={4} type="blog" />
        ) : posts?.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No blog posts yet.</p>
              <p className="text-sm">
                Click &quot;New Post&quot; to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {posts?.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {post.coverImage && (
                    <div className="h-40 bg-muted relative">
                      <img
                        src={post.coverImage}
                        alt={post.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        variant={post.published ? "default" : "secondary"}
                        className="absolute top-2 right-2"
                      >
                        {post.published ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                          </>
                        )}
                      </Badge>
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {post.titleEn}
                        </h3>
                        {post.summaryEn && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {post.summaryEn}
                          </p>
                        )}
                      </div>
                      {!post.coverImage && (
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                        >
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {post.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.tags.slice(0, 2).join(", ")}
                          {post.tags.length > 2 && `+${post.tags.length - 2}`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(post)}
                      >
                        {post.published ? (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
