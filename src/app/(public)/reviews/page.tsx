"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, Quote, PenLine, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import BlurFade from "@/components/magicui/blur-fade";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string | null;
  content: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = useTranslations("reviews");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews/public");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      setFormData({ name: "", role: "", company: "", content: "", rating: 5 });

      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const StarRating = ({
    rating,
    onSelect,
    interactive = false,
  }: {
    rating: number;
    onSelect?: (rating: number) => void;
    interactive?: boolean;
  }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onSelect?.(i + 1)}
          className={
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : "cursor-default"
          }
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 mb-6"
            >
              <Quote className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              {t("title") || "Guest Book"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("subtitle") ||
                "Read what others say about working with me, or leave your own review!"}
            </p>

            {/* Add Review Button */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <PenLine className="w-5 h-5" />
                  {t("leaveReview") || "Leave a Review"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {t("writeReview") || "Write a Review"}
                  </DialogTitle>
                  <DialogDescription>
                    {t("reviewDescription") ||
                      "Share your experience working with me. Your review will be visible after approval."}
                  </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <p className="text-lg font-medium text-center">
                        {t("thankYou") || "Thank you for your review!"}
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        {t("pendingApproval") ||
                          "It will be visible after approval."}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {t("yourName") || "Your Name"}
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">
                            {t("yourRole") || "Your Role"}
                          </Label>
                          <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                            placeholder="CEO"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">
                            {t("company") || "Company"}
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            placeholder="Acme Inc."
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{t("rating") || "Rating"}</Label>
                        <StarRating
                          rating={formData.rating}
                          onSelect={(rating) =>
                            setFormData({ ...formData, rating })
                          }
                          interactive
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">
                          {t("yourReview") || "Your Review"}
                        </Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: e.target.value,
                            })
                          }
                          placeholder={
                            t("reviewPlaceholder") || "Share your experience..."
                          }
                          rows={4}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            {t("submitting") || "Submitting..."}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t("submitReview") || "Submit Review"}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </AnimatePresence>
              </DialogContent>
            </Dialog>
          </div>
        </BlurFade>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <BlurFade delay={0.2}>
            <Card className="max-w-md mx-auto">
              <CardContent className="flex flex-col items-center py-12">
                <Quote className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  {t("noReviews") ||
                    "No reviews yet. Be the first to leave one!"}
                </p>
              </CardContent>
            </Card>
          </BlurFade>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <BlurFade key={review.id} delay={0.1 + index * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    className={`h-full ${
                      review.featured ? "border-primary/50 bg-primary/5" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        {review.avatarUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={review.avatarUrl}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                            <span className="text-lg font-semibold text-white">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {review.role} at {review.company}
                          </p>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <blockquote className="text-muted-foreground italic">
                        "{review.content}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
