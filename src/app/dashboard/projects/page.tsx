"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, FolderKanban, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "@/components/ui/image-upload";
import { SkeletonPage } from "@/components/ui/skeleton";

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  href: string | null;
  posterImage: string | null;
  mobileAppImages: string[];
  webAppImages: string[];
  technologies: string[];
  active: boolean;
  featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    titleEn: "",
    titleFr: "",
    descriptionEn: "",
    descriptionFr: "",
    href: "",
    posterImage: "",
    mobileAppImages: [] as string[],
    webAppImages: [] as string[],
    technologies: "",
    active: true,
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects-db");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingProject(null);
    setFormData({
      slug: "",
      titleEn: "",
      titleFr: "",
      descriptionEn: "",
      descriptionFr: "",
      href: "",
      posterImage: "",
      mobileAppImages: [],
      webAppImages: [],
      technologies: "",
      active: true,
      featured: false,
    });
    setIsOpen(true);
  }

  function openEditDialog(item: Project) {
    setEditingProject(item);
    setFormData({
      slug: item.slug,
      titleEn: item.titleEn,
      titleFr: item.titleFr,
      descriptionEn: item.descriptionEn,
      descriptionFr: item.descriptionFr,
      href: item.href || "",
      posterImage: item.posterImage || "",
      mobileAppImages: item.mobileAppImages || [],
      webAppImages: item.webAppImages || [],
      technologies: item.technologies.join(", "),
      active: item.active,
      featured: item.featured,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      slug: formData.slug,
      titleEn: formData.titleEn,
      titleFr: formData.titleFr,
      descriptionEn: formData.descriptionEn,
      descriptionFr: formData.descriptionFr,
      href: formData.href || null,
      posterImage: formData.posterImage || null,
      mobileAppImages: formData.mobileAppImages,
      webAppImages: formData.webAppImages,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      active: formData.active,
      featured: formData.featured,
    };

    try {
      const url = editingProject
        ? `/api/projects-db/${editingProject.id}`
        : "/api/projects-db";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(editingProject ? "Project updated" : "Project added");
      setIsOpen(false);
      fetchProjects();
    } catch {
      toast.error("Failed to save project");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects-db/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
  }

  if (loading) {
    return <SkeletonPage type="projects" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    placeholder="my-project"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="href">Project URL</Label>
                  <Input
                    id="href"
                    type="url"
                    value={formData.href}
                    onChange={(e) =>
                      setFormData({ ...formData, href: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titleEn">Title (English)</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) =>
                      setFormData({ ...formData, titleEn: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleFr">Title (French)</Label>
                  <Input
                    id="titleFr"
                    value={formData.titleFr}
                    onChange={(e) =>
                      setFormData({ ...formData, titleFr: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (English)</Label>
                <Textarea
                  id="descriptionEn"
                  rows={3}
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">Description (French)</Label>
                <Textarea
                  id="descriptionFr"
                  rows={3}
                  value={formData.descriptionFr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionFr: e.target.value })
                  }
                  required
                />
              </div>
              <ImageUpload
                value={formData.posterImage}
                onChange={(url) =>
                  setFormData({ ...formData, posterImage: url })
                }
                folder="portfolio/projects/posters"
                aspectRatio="landscape"
                label="Poster Image"
                showUrlInput={true}
              />

              {/* Mobile App Images */}
              <MultiImageUpload
                values={formData.mobileAppImages}
                onChange={(urls) =>
                  setFormData({ ...formData, mobileAppImages: urls })
                }
                folder="portfolio/projects/mobile"
                aspectRatio="portrait"
                maxImages={20}
                label="Mobile App Screenshots"
                showUrlInput={true}
              />

              {/* Web App Images */}
              <MultiImageUpload
                values={formData.webAppImages}
                onChange={(urls) =>
                  setFormData({ ...formData, webAppImages: urls })
                }
                folder="portfolio/projects/web"
                aspectRatio="landscape"
                maxImages={20}
                label="Website Screenshots"
                showUrlInput={true}
              />

              <div className="space-y-2">
                <Label htmlFor="technologies">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  placeholder="React, TypeScript, Node.js"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: !!checked })
                    }
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: !!checked })
                    }
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? "Update" : "Add"} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No projects yet</p>
              <Button className="mt-4" onClick={openAddDialog}>
                Add your first project
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((item) => (
            <Card key={item.id} className={!item.active ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                {item.posterImage && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                    <img
                      src={item.posterImage}
                      alt={item.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {item.titleEn}
                      {item.featured && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      /{item.slug}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {item.href && (
                      <Link href={item.href} target="_blank">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {item.descriptionEn}
                </p>
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-muted rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{item.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
