"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Building2,
  FolderGit2,
  FileText,
  Upload,
  Save,
  X,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface WorkExperience {
  id: string;
  company: string;
  href?: string;
  logoUrl?: string;
  location: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  order: number;
  badges: string[];
}

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  subtitleEn?: string;
  subtitleFr?: string;
  descriptionEn: string;
  descriptionFr: string;
  dates?: string;
  active: boolean;
  featured: boolean;
  order: number;
  posterImage?: string;
  mobileAppImages: string[];
  webAppImages: string[];
  technologies: string[];
}

export default function ResumeManagerPage() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Work Experience Form State
  const [workFormOpen, setWorkFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [workForm, setWorkForm] = useState({
    company: "",
    href: "",
    logoUrl: "",
    location: "",
    titleEn: "",
    titleFr: "",
    descriptionEn: "",
    descriptionFr: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  // Project Form State
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    slug: "",
    titleEn: "",
    titleFr: "",
    subtitleEn: "",
    subtitleFr: "",
    descriptionEn: "",
    descriptionFr: "",
    dates: "",
    active: true,
    featured: true,
    posterImage: "",
    technologies: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [workRes, projectsRes] = await Promise.all([
        fetch("/api/work"),
        fetch("/api/projects-db"),
      ]);

      if (workRes.ok) {
        const workData = await workRes.json();
        setWorkExperiences(workData);
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Work Experience CRUD
  const handleWorkSubmit = async () => {
    try {
      setSaving(true);
      const method = editingWork ? "PUT" : "POST";
      const url = editingWork ? `/api/work/${editingWork.id}` : "/api/work";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...workForm,
          endDate: workForm.isCurrent ? null : workForm.endDate || null,
        }),
      });

      if (response.ok) {
        toast.success(
          editingWork ? "Work experience updated!" : "Work experience created!"
        );
        setWorkFormOpen(false);
        setEditingWork(null);
        resetWorkForm();
        fetchData();
      } else {
        toast.error("Failed to save work experience");
      }
    } catch (error) {
      console.error("Error saving work experience:", error);
      toast.error("Failed to save work experience");
    } finally {
      setSaving(false);
    }
  };

  const handleWorkDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work experience?")) {
      return;
    }

    try {
      const response = await fetch(`/api/work/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Work experience deleted!");
        fetchData();
      } else {
        toast.error("Failed to delete work experience");
      }
    } catch (error) {
      console.error("Error deleting work experience:", error);
      toast.error("Failed to delete work experience");
    }
  };

  const editWork = (work: WorkExperience) => {
    setEditingWork(work);
    setWorkForm({
      company: work.company,
      href: work.href || "",
      logoUrl: work.logoUrl || "",
      location: work.location,
      titleEn: work.titleEn,
      titleFr: work.titleFr,
      descriptionEn: work.descriptionEn,
      descriptionFr: work.descriptionFr,
      startDate: work.startDate,
      endDate: work.endDate || "",
      isCurrent: work.isCurrent,
    });
    setWorkFormOpen(true);
  };

  const resetWorkForm = () => {
    setWorkForm({
      company: "",
      href: "",
      logoUrl: "",
      location: "",
      titleEn: "",
      titleFr: "",
      descriptionEn: "",
      descriptionFr: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    });
  };

  // Project CRUD
  const handleProjectSubmit = async () => {
    try {
      setSaving(true);
      const method = editingProject ? "PUT" : "POST";
      const url = editingProject
        ? `/api/projects-db/${editingProject.id}`
        : "/api/projects-db";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        toast.success(editingProject ? "Project updated!" : "Project created!");
        setProjectFormOpen(false);
        setEditingProject(null);
        resetProjectForm();
        fetchData();
      } else {
        toast.error("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects-db/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Project deleted!");
        fetchData();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      slug: project.slug,
      titleEn: project.titleEn,
      titleFr: project.titleFr,
      subtitleEn: project.subtitleEn || "",
      subtitleFr: project.subtitleFr || "",
      descriptionEn: project.descriptionEn,
      descriptionFr: project.descriptionFr,
      dates: project.dates || "",
      active: project.active,
      featured: project.featured,
      posterImage: project.posterImage || "",
      technologies: project.technologies.join(", "),
    });
    setProjectFormOpen(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      slug: "",
      titleEn: "",
      titleFr: "",
      subtitleEn: "",
      subtitleFr: "",
      descriptionEn: "",
      descriptionFr: "",
      dates: "",
      active: true,
      featured: true,
      posterImage: "",
      technologies: "",
    });
  };

  // Image Upload
  const handleImageUpload = async (
    file: File,
    folder: string
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
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
            <h1 className="text-3xl font-bold">Resume Manager</h1>
            <p className="text-muted-foreground">
              Manage your work experiences, projects, and portfolio content
            </p>
          </div>
        </div>

        <Tabs defaultValue="work" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="work" className="gap-2">
              <Building2 className="w-4 h-4" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderGit2 className="w-4 h-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Work Experience Tab */}
          <TabsContent value="work" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Work Experiences</h2>
              <Dialog open={workFormOpen} onOpenChange={setWorkFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingWork(null);
                      resetWorkForm();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingWork ? "Edit" : "Add"} Work Experience
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={workForm.company}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              company: e.target.value,
                            })
                          }
                          placeholder="Company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={workForm.location}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              location: e.target.value,
                            })
                          }
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title (English)</Label>
                        <Input
                          value={workForm.titleEn}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              titleEn: e.target.value,
                            })
                          }
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title (French)</Label>
                        <Input
                          value={workForm.titleFr}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              titleFr: e.target.value,
                            })
                          }
                          placeholder="Ingénieur Logiciel"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Website URL</Label>
                        <Input
                          value={workForm.href}
                          onChange={(e) =>
                            setWorkForm({ ...workForm, href: e.target.value })
                          }
                          placeholder="https://company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Logo URL</Label>
                        <Input
                          value={workForm.logoUrl}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              logoUrl: e.target.value,
                            })
                          }
                          placeholder="/company-logo.png"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          value={workForm.startDate}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              startDate: e.target.value,
                            })
                          }
                          placeholder="September 2025"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          value={workForm.endDate}
                          onChange={(e) =>
                            setWorkForm({
                              ...workForm,
                              endDate: e.target.value,
                            })
                          }
                          placeholder="Present"
                          disabled={workForm.isCurrent}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isCurrent"
                        checked={workForm.isCurrent}
                        onChange={(e) =>
                          setWorkForm({
                            ...workForm,
                            isCurrent: e.target.checked,
                          })
                        }
                      />
                      <Label htmlFor="isCurrent">Currently working here</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={workForm.descriptionEn}
                        onChange={(e) =>
                          setWorkForm({
                            ...workForm,
                            descriptionEn: e.target.value,
                          })
                        }
                        placeholder="Describe your responsibilities..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description (French)</Label>
                      <Textarea
                        value={workForm.descriptionFr}
                        onChange={(e) =>
                          setWorkForm({
                            ...workForm,
                            descriptionFr: e.target.value,
                          })
                        }
                        placeholder="Décrivez vos responsabilités..."
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setWorkFormOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleWorkSubmit} disabled={saving}>
                        {saving && (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        {editingWork ? "Update" : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {workExperiences.map((work) => (
                <Card key={work.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {work.logoUrl ? (
                            <img
                              src={work.logoUrl}
                              alt={work.company}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{work.company}</h3>
                          <p className="text-sm text-muted-foreground">
                            {work.titleEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {work.startDate} -{" "}
                            {work.isCurrent ? "Present" : work.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editWork(work)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleWorkDelete(work.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {workExperiences.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No work experiences yet.</p>
                    <p className="text-sm">
                      Click &quot;Add Experience&quot; to get started.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Dialog open={projectFormOpen} onOpenChange={setProjectFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingProject(null);
                      resetProjectForm();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit" : "Add"} Project
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input
                          value={projectForm.slug}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              slug: e.target.value,
                            })
                          }
                          placeholder="my-project"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dates</Label>
                        <Input
                          value={projectForm.dates}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              dates: e.target.value,
                            })
                          }
                          placeholder="Jan 2024 - Present"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title (English)</Label>
                        <Input
                          value={projectForm.titleEn}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              titleEn: e.target.value,
                            })
                          }
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title (French)</Label>
                        <Input
                          value={projectForm.titleFr}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              titleFr: e.target.value,
                            })
                          }
                          placeholder="Nom du Projet"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subtitle (English)</Label>
                        <Input
                          value={projectForm.subtitleEn}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              subtitleEn: e.target.value,
                            })
                          }
                          placeholder="A brief description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle (French)</Label>
                        <Input
                          value={projectForm.subtitleFr}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              subtitleFr: e.target.value,
                            })
                          }
                          placeholder="Une brève description"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Poster Image URL</Label>
                      <Input
                        value={projectForm.posterImage}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            posterImage: e.target.value,
                          })
                        }
                        placeholder="https://cloudinary.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={projectForm.technologies}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            technologies: e.target.value,
                          })
                        }
                        placeholder="Flutter, Firebase, Node.js"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description (English)</Label>
                      <Textarea
                        value={projectForm.descriptionEn}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            descriptionEn: e.target.value,
                          })
                        }
                        placeholder="Describe your project..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description (French)</Label>
                      <Textarea
                        value={projectForm.descriptionFr}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            descriptionFr: e.target.value,
                          })
                        }
                        placeholder="Décrivez votre projet..."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="active"
                          checked={projectForm.active}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              active: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={projectForm.featured}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              featured: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setProjectFormOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleProjectSubmit} disabled={saving}>
                        {saving && (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        {editingProject ? "Update" : "Create"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          {project.posterImage ? (
                            <img
                              src={project.posterImage}
                              alt={project.titleEn}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FolderGit2 className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{project.titleEn}</h3>
                            {project.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.subtitleEn}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editProject(project)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleProjectDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {projects.length === 0 && (
                <Card className="md:col-span-2">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <FolderGit2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No projects yet.</p>
                    <p className="text-sm">
                      Click &quot;Add Project&quot; to get started.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
