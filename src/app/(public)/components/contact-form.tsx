"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Send,
  CheckCircle,
  User,
  Mail,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  Phone,
  Shield,
  RefreshCw,
} from "lucide-react";
import Modal from "./modal";
import { useTranslations } from "@/hooks/use-translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function ContactFormComponent() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaSum: "",
  });
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaAnswerError, setCaptchaAnswerError] = useState(false);

  // Initialize Captcha
  useState(() => {
    setCaptchaA(Math.floor(Math.random() * 10) + 1);
    setCaptchaB(Math.floor(Math.random() * 10) + 1);
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (parseInt(formData.captchaSum) !== captchaA + captchaB) {
      setCaptchaAnswerError(true);
      setError("Incorrect captcha answer.");
      return;
    }

    setCaptchaAnswerError(false);
    setIsSubmitting(true);
    setError(null);

    try {
      // Save to database
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsConfirmationOpen(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          captchaSum: "",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      {isConfirmationOpen && (
        <Modal open={isConfirmationOpen} setOpen={setIsConfirmationOpen} />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Form Header */}
              <motion.div
                variants={itemVariants}
                className="text-center space-y-4 mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{t("subtitle")}</h3>
                <p className="text-muted-foreground">{t("description")}</p>
              </motion.div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="flex items-center space-x-2 text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>{t("form.name")}</span>
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("form.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="flex items-center space-x-2 text-sm font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{t("form.email")}</span>
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Subject Field */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Label
                  htmlFor="subject"
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("form.subject") || "Subject"}</span>
                </Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    id="subject"
                    type="text"
                    placeholder={
                      t("form.subjectPlaceholder") || "What is this about?"
                    }
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-12 bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300"
                  />
                </motion.div>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Label
                  htmlFor="message"
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("form.message")}</span>
                </Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Textarea
                    id="message"
                    placeholder={t("form.messagePlaceholder")}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300"
                  />
                </motion.div>
              </motion.div>

              {/* Captcha Field */}
              <motion.div variants={itemVariants} className="space-y-3">
                <Label
                  htmlFor="captchaSum"
                  className={`flex items-center space-x-2 text-sm font-medium ${captchaAnswerError ? "text-red-500" : ""
                    }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>
                    {t("form.captcha", { a: captchaA, b: captchaB })}
                  </span>
                </Label>
                <div className="flex gap-2">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-1"
                  >
                    <Input
                      id="captchaSum"
                      type="number"
                      placeholder={t("form.captchaPlaceholder")}
                      value={formData.captchaSum}
                      onChange={handleChange}
                      required
                      className={`h-12 bg-background/50 border-border/40 focus:border-primary/50 transition-all duration-300 ${captchaAnswerError ? "border-red-500 focus:border-red-500" : ""
                        }`}
                    />
                  </motion.div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 px-3"
                    onClick={() => {
                      setCaptchaA(Math.floor(Math.random() * 10) + 1);
                      setCaptchaB(Math.floor(Math.random() * 10) + 1);
                      setFormData((prev) => ({ ...prev, captchaSum: "" }));
                      setCaptchaAnswerError(false);
                    }}
                    title="Refresh Math Question"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                  >
                    {/* Button Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

                    {/* Button Content */}
                    <div className="relative flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>{t("form.sending")}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>{t("form.submit")}</span>
                          <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>

                {/* Additional Info */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-muted-foreground mt-4"
                >
                  {t("form.successDescription")}
                </motion.p>
              </motion.div>

              {/* Alternative Contact Methods */}
              <motion.div
                variants={itemVariants}
                className="text-center space-y-4 pt-8 border-t border-border/40"
              >
                <p className="text-sm text-muted-foreground">
                  {t("form.alternativeContact")}
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="mailto:contact@example.com"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{t("form.emailLink")}</span>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm">{t("form.linkedin")}</span>
                  </motion.a>
                </div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
