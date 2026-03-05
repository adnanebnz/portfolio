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
import {
  Plus,
  Pencil,
  Trash2,
  FolderKanban,
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Settings,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ImageUpload, MultiImageUpload } from "@/components/ui/image-upload";
import { SkeletonPage } from "@/components/ui/skeleton";

interface KeyFeature {
  title: string;
  description: string;
}

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
  keyFeaturesEn: Record<string, string> | null;
  keyFeaturesFr: Record<string, string> | null;
  dates: string | null;
  active: boolean;
  featured: boolean;
}

interface FormData {
  slug: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  href: string;
  posterImage: string;
  mobileAppImages: string[];
  webAppImages: string[];
  technologies: string;
  keyFeaturesEn: KeyFeature[];
  keyFeaturesFr: KeyFeature[];
  dates: string;
  active: boolean;
  featured: boolean;
}

const initialFormData: FormData = {
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
  keyFeaturesEn: [],
  keyFeaturesFr: [],
  dates: "",
  active: true,
  featured: false,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  function objectToFeatureArray(
    obj: Record<string, string> | null
  ): KeyFeature[] {
    if (!obj) return [];
    return Object.entries(obj).map(([title, description]) => ({
      title,
      description,
    }));
  }

  function featureArrayToObject(
    features: KeyFeature[]
  ): Record<string, string> {
    const obj: Record<string, string> = {};
    features.forEach((feature) => {
      if (feature.title.trim()) {
        obj[feature.title.trim()] = feature.description;
      }
    });
    return obj;
  }

  function openAddDialog() {
    setEditingProject(null);
    setFormData(initialFormData);
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
      keyFeaturesEn: objectToFeatureArray(item.keyFeaturesEn),
      keyFeaturesFr: objectToFeatureArray(item.keyFeaturesFr),
      dates: item.dates || "",
      active: item.active,
      featured: item.featured,
    });
    setIsOpen(true);
  }

  function addKeyFeature(lang: "En" | "Fr") {
    const key = `keyFeatures${lang}` as keyof FormData;
    setFormData({
      ...formData,
      [key]: [
        ...(formData[key] as KeyFeature[]),
        { title: "", description: "" },
      ],
    });
  }

  function removeKeyFeature(lang: "En" | "Fr", index: number) {
    const key = `keyFeatures${lang}` as keyof FormData;
    setFormData({
      ...formData,
      [key]: (formData[key] as KeyFeature[]).filter((_, i) => i !== index),
    });
  }

  function updateKeyFeature(
    lang: "En" | "Fr",
    index: number,
    field: "title" | "description",
    value: string
  ) {
    const key = `keyFeatures${lang}` as keyof FormData;
    const features = [...(formData[key] as KeyFeature[])];
    features[index] = { ...features[index], [field]: value };
    setFormData({ ...formData, [key]: features });
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
      keyFeaturesEn:
        formData.keyFeaturesEn.length > 0
          ? featureArrayToObject(formData.keyFeaturesEn)
          : null,
      keyFeaturesFr:
        formData.keyFeaturesFr.length > 0
          ? featureArrayToObject(formData.keyFeaturesFr)
          : null,
      dates: formData.dates || null,
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
          <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <FolderKanban className="h-6 w-6" />
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8 py-4">
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
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
                      placeholder="https://example.com"
                      value={formData.href}
                      onChange={(e) =>
                        setFormData({ ...formData, href: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleEn">Title (English)</Label>
                    <Input
                      id="titleEn"
                      placeholder="My Awesome Project"
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
                      placeholder="Mon Projet Génial"
                      value={formData.titleFr}
                      onChange={(e) =>
                        setFormData({ ...formData, titleFr: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Project Dates</Label>
                    <Input
                      id="dates"
                      placeholder="Jan 2024 - Mar 2024"
                      value={formData.dates}
                      onChange={(e) =>
                        setFormData({ ...formData, dates: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Descriptions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <FileText className="h-5 w-5" />
                  Descriptions
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                  <div className="space-y-2">
                    <Label htmlFor="descriptionEn">Description (English)</Label>
                    <Textarea
                      id="descriptionEn"
                      rows={4}
                      placeholder="Describe your project in English..."
                      value={formData.descriptionEn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionEn: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descriptionFr">Description (French)</Label>
                    <Textarea
                      id="descriptionFr"
                      rows={4}
                      placeholder="Décrivez votre projet en français..."
                      value={formData.descriptionFr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionFr: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Images */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <ImageIcon className="h-5 w-5" />
                  Images
                </div>
                <div className="space-y-6 pl-7">
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
                </div>
              </div>

              {/* Section 4: Key Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Sparkles className="h-5 w-5" />
                  Key Features
                </div>
                <p className="text-sm text-muted-foreground pl-7">
                  Add the key features of your project with their descriptions
                  in both languages.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-7">
                  {/* English Features */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">
                        🇬🇧 English Features
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addKeyFeature("En")}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Feature
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.keyFeaturesEn.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No features added yet. Click &quot;Add Feature&quot;
                          to start.
                        </p>
                      ) : (
                        formData.keyFeaturesEn.map((feature, index) => (
                          <div
                            key={index}
                            className="space-y-2 p-3 rounded-md border bg-background"
                          >
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Feature Title"
                                value={feature.title}
                                onChange={(e) =>
                                  updateKeyFeature(
                                    "En",
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeKeyFeature("En", index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              placeholder="Feature description..."
                              value={feature.description}
                              onChange={(e) =>
                                updateKeyFeature(
                                  "En",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* French Features */}
                  <div className="space-y-4 p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">
                        🇫🇷 French Features
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addKeyFeature("Fr")}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Feature
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.keyFeaturesFr.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucune fonctionnalité ajoutée. Cliquez sur &quot;Add
                          Feature&quot; pour commencer.
                        </p>
                      ) : (
                        formData.keyFeaturesFr.map((feature, index) => (
                          <div
                            key={index}
                            className="space-y-2 p-3 rounded-md border bg-background"
                          >
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Titre de la fonctionnalité"
                                value={feature.title}
                                onChange={(e) =>
                                  updateKeyFeature(
                                    "Fr",
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeKeyFeature("Fr", index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              placeholder="Description de la fonctionnalité..."
                              value={feature.description}
                              onChange={(e) =>
                                updateKeyFeature(
                                  "Fr",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Technologies & Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Settings className="h-5 w-5" />
                  Technologies & Settings
                </div>
                <div className="pl-7 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="technologies">
                      Technologies (comma-separated)
                    </Label>
                    <Input
                      id="technologies"
                      placeholder="React, TypeScript, Node.js, PostgreSQL"
                      value={formData.technologies}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          technologies: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, active: !!checked })
                        }
                      />
                      <Label htmlFor="active" className="cursor-pointer">
                        Active (Visible on portfolio)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, featured: !!checked })
                        }
                      />
                      <Label
                        htmlFor="featured"
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <Star className="h-4 w-4 text-yellow-500" />
                        Featured Project
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="min-w-[120px]">
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
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded flex items-center gap-1">
                          <Star className="h-3 w-3" />
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
                {item.keyFeaturesEn &&
                  Object.keys(item.keyFeaturesEn).length > 0 && (
                    <div className="mb-3 flex items-center gap-1 text-xs text-primary">
                      <Sparkles className="h-3 w-3" />
                      {Object.keys(item.keyFeaturesEn).length} key feature
                      {Object.keys(item.keyFeaturesEn).length > 1 ? "s" : ""}
                    </div>
                  )}
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
