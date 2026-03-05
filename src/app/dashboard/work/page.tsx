"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { SkeletonPage } from "@/components/ui/skeleton";

interface WorkExperience {
  id: string;
  company: string;
  href: string | null;
  badges: string[];
  location: string;
  titleEn: string;
  titleFr: string;
  logoUrl: string | null;
  startDate: string;
  endDate: string | null;
  descriptionEn: string;
  descriptionFr: string;
}

export default function WorkPage() {
  const [work, setWork] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    href: "",
    badges: "",
    location: "",
    titleEn: "",
    titleFr: "",
    logoUrl: "",
    startDate: "",
    endDate: "",
    descriptionEn: "",
    descriptionFr: "",
  });

  useEffect(() => {
    fetchWork();
  }, []);

  async function fetchWork() {
    try {
      const res = await fetch("/api/work");
      const data = await res.json();
      setWork(data);
    } catch (error) {
      toast.error("Failed to fetch work experiences");
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingWork(null);
    setFormData({
      company: "",
      href: "",
      badges: "",
      location: "",
      titleEn: "",
      titleFr: "",
      logoUrl: "",
      startDate: "",
      endDate: "",
      descriptionEn: "",
      descriptionFr: "",
    });
    setIsOpen(true);
  }

  function openEditDialog(item: WorkExperience) {
    setEditingWork(item);
    setFormData({
      company: item.company,
      href: item.href || "",
      badges: item.badges.join(", "),
      location: item.location,
      titleEn: item.titleEn,
      titleFr: item.titleFr,
      logoUrl: item.logoUrl || "",
      startDate: item.startDate,
      endDate: item.endDate || "",
      descriptionEn: item.descriptionEn,
      descriptionFr: item.descriptionFr,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      company: formData.company,
      href: formData.href || null,
      badges: formData.badges
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
      location: formData.location,
      titleEn: formData.titleEn,
      titleFr: formData.titleFr,
      logoUrl: formData.logoUrl || null,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      descriptionEn: formData.descriptionEn,
      descriptionFr: formData.descriptionFr,
    };

    try {
      const url = editingWork ? `/api/work/${editingWork.id}` : "/api/work";
      const method = editingWork ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingWork ? "Work experience updated" : "Work experience added"
      );
      setIsOpen(false);
      fetchWork();
    } catch {
      toast.error("Failed to save work experience");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this work experience?"))
      return;

    try {
      const res = await fetch(`/api/work/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Work experience deleted");
      fetchWork();
    } catch {
      toast.error("Failed to delete work experience");
    }
  }

  if (loading) {
    return <SkeletonPage type="default" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Work Experience</h1>
          <p className="text-muted-foreground">Manage your work history</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWork ? "Edit Work Experience" : "Add Work Experience"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titleEn">Job Title (English)</Label>
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
                  <Label htmlFor="titleFr">Job Title (French)</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    placeholder="e.g., January 2024"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">
                    End Date (leave empty if current)
                  </Label>
                  <Input
                    id="endDate"
                    placeholder="e.g., Present"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="href">Company Website</Label>
                  <Input
                    id="href"
                    type="url"
                    value={formData.href}
                    onChange={(e) =>
                      setFormData({ ...formData, href: e.target.value })
                    }
                  />
                </div>
                <ImageUpload
                  value={formData.logoUrl}
                  onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                  folder="portfolio/work/logos"
                  aspectRatio="square"
                  label="Company Logo"
                  showUrlInput={true}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badges">Badges (comma-separated)</Label>
                <Input
                  id="badges"
                  placeholder="e.g., Remote, Full-time"
                  value={formData.badges}
                  onChange={(e) =>
                    setFormData({ ...formData, badges: e.target.value })
                  }
                />
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
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingWork ? "Update" : "Add"} Experience
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {work.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No work experiences yet</p>
              <Button className="mt-4" onClick={openAddDialog}>
                Add your first experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          work.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex gap-4">
                  {item.logoUrl && (
                    <img
                      src={item.logoUrl}
                      alt={item.company}
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">{item.titleEn}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.company} • {item.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.startDate} - {item.endDate || "Present"}
                    </p>
                    {item.badges.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
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
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {item.descriptionEn}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
