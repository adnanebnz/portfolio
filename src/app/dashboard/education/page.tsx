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
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { SkeletonPage } from "@/components/ui/skeleton";

interface Education {
  id: string;
  school: string;
  href: string | null;
  degreeEn: string;
  degreeFr: string;
  logoUrl: string | null;
  startDate: string;
  endDate: string | null;
  descriptionEn: string | null;
  descriptionFr: string | null;
}

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    school: "",
    href: "",
    degreeEn: "",
    degreeFr: "",
    logoUrl: "",
    startDate: "",
    endDate: "",
    descriptionEn: "",
    descriptionFr: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducation(data);
    } catch (error) {
      toast.error("Failed to fetch education");
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingItem(null);
    setFormData({
      school: "",
      href: "",
      degreeEn: "",
      degreeFr: "",
      logoUrl: "",
      startDate: "",
      endDate: "",
      descriptionEn: "",
      descriptionFr: "",
    });
    setIsOpen(true);
  }

  function openEditDialog(item: Education) {
    setEditingItem(item);
    setFormData({
      school: item.school,
      href: item.href || "",
      degreeEn: item.degreeEn,
      degreeFr: item.degreeFr,
      logoUrl: item.logoUrl || "",
      startDate: item.startDate,
      endDate: item.endDate || "",
      descriptionEn: item.descriptionEn || "",
      descriptionFr: item.descriptionFr || "",
    });
    setIsOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      school: formData.school,
      href: formData.href || null,
      degreeEn: formData.degreeEn,
      degreeFr: formData.degreeFr,
      logoUrl: formData.logoUrl || null,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      descriptionEn: formData.descriptionEn || null,
      descriptionFr: formData.descriptionFr || null,
    };

    try {
      const url = editingItem
        ? `/api/education/${editingItem.id}`
        : "/api/education";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(editingItem ? "Education updated" : "Education added");
      setIsOpen(false);
      fetchEducation();
    } catch {
      toast.error("Failed to save education");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Education deleted");
      fetchEducation();
    } catch {
      toast.error("Failed to delete education");
    }
  }

  if (loading) {
    return <SkeletonPage type="default" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground">Manage your education history</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Education" : "Add Education"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school">School/University</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) =>
                    setFormData({ ...formData, school: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degreeEn">Degree (English)</Label>
                  <Input
                    id="degreeEn"
                    value={formData.degreeEn}
                    onChange={(e) =>
                      setFormData({ ...formData, degreeEn: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degreeFr">Degree (French)</Label>
                  <Input
                    id="degreeFr"
                    value={formData.degreeFr}
                    onChange={(e) =>
                      setFormData({ ...formData, degreeFr: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Year</Label>
                  <Input
                    id="startDate"
                    placeholder="e.g., 2020"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Year</Label>
                  <Input
                    id="endDate"
                    placeholder="e.g., 2024"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="href">School Website</Label>
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
                  folder="portfolio/education/logos"
                  aspectRatio="square"
                  label="School Logo"
                  showUrlInput={true}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">
                  Description (English, optional)
                </Label>
                <Textarea
                  id="descriptionEn"
                  rows={2}
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">
                  Description (French, optional)
                </Label>
                <Textarea
                  id="descriptionFr"
                  rows={2}
                  value={formData.descriptionFr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionFr: e.target.value })
                  }
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
                  {editingItem ? "Update" : "Add"} Education
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {education.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No education entries yet</p>
              <Button className="mt-4" onClick={openAddDialog}>
                Add your first education
              </Button>
            </CardContent>
          </Card>
        ) : (
          education.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex gap-4">
                  {item.logoUrl && (
                    <img
                      src={item.logoUrl}
                      alt={item.school}
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">{item.degreeEn}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.school}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.startDate} - {item.endDate || "Present"}
                    </p>
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
              {item.descriptionEn && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.descriptionEn}
                  </p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
