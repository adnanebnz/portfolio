"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Star,
  MessageSquare,
  Check,
  X,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { SkeletonPage } from "@/components/ui/skeleton";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string | null;
  content: string;
  rating: number;
  featured: boolean;
  approved: boolean;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    avatarUrl: "",
    content: "",
    rating: 5,
    featured: false,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }

  function openAddDialog() {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      avatarUrl: "",
      content: "",
      rating: 5,
      featured: false,
    });
    setIsOpen(true);
  }

  function openEditDialog(item: Review) {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company,
      avatarUrl: item.avatarUrl || "",
      content: item.content,
      rating: item.rating,
      featured: item.featured,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...formData,
      avatarUrl: formData.avatarUrl || null,
    };

    try {
      const url = editingItem
        ? `/api/reviews/${editingItem.id}`
        : "/api/reviews";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(editingItem ? "Review updated" : "Review added");
      setIsOpen(false);
      fetchReviews();
    } catch {
      toast.error("Failed to save review");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Review deleted");
      fetchReviews();
    } catch {
      toast.error("Failed to delete review");
    }
  }

  async function toggleFeatured(review: Review) {
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, featured: !review.featured }),
      });
      if (!res.ok) throw new Error();
      toast.success(review.featured ? "Review unfeatured" : "Review featured");
      fetchReviews();
    } catch {
      toast.error("Failed to update review");
    }
  }

  async function toggleApproved(review: Review) {
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, approved: !review.approved }),
      });
      if (!res.ok) throw new Error();
      toast.success(review.approved ? "Review unapproved" : "Review approved");
      fetchReviews();
    } catch {
      toast.error("Failed to update review");
    }
  }

  const approvedReviews = reviews.filter((r) => r.approved);
  const pendingReviews = reviews.filter((r) => !r.approved);

  if (loading) {
    return <SkeletonPage type="reviews" />;
  }

  const ReviewCard = ({ item }: { item: Review }) => (
    <Card className={item.featured ? "border-primary" : ""}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex gap-4">
          {item.avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.avatarUrl}
              alt={item.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {item.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
              {item.name}
              {item.featured && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
              {!item.approved && (
                <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Pending
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {item.role} at {item.company}
            </p>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {!item.approved ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => toggleApproved(item)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-1" /> Approve
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleApproved(item)}
            >
              Unapprove
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFeatured(item)}
          >
            {item.featured ? "Unfeature" : "Feature"}
          </Button>
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
        <p className="text-sm text-muted-foreground italic">"{item.content}"</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            Manage testimonials and reviews
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Review" : "Add Review"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Reviewer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
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
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, avatarUrl: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  rows={4}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded"
                />
                <Label htmlFor="featured">
                  Featured review (show on homepage)
                </Label>
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
                  {editingItem ? "Update" : "Add"} Review
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingReviews.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Approved ({approvedReviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Check className="h-12 w-12 text-green-500 mb-4" />
                  <p className="text-muted-foreground">No pending reviews</p>
                </CardContent>
              </Card>
            ) : (
              pendingReviews.map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid gap-4">
            {approvedReviews.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No approved reviews yet
                  </p>
                  <Button className="mt-4" onClick={openAddDialog}>
                    Add your first review
                  </Button>
                </CardContent>
              </Card>
            ) : (
              approvedReviews.map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
