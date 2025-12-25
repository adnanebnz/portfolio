"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA, getTranslatedText, Locale } from "@/data/resume";
import Markdown from "react-markdown";
import ContactFormComponent from "./components/contact-form";
import { useTranslations } from "@/hooks/use-translations";
import { useLocale } from "@/components/locale-provider";
import { CVDownloadButton } from "@/components/cv-download-button";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import {
  Briefcase,
  Code,
  User,
  Mail,
  Star,
  Award,
  Github,
  Linkedin,
  ArrowDown,
  Sparkles,
  Zap,
  Rocket,
} from "lucide-react";
import IconCloud from "@/components/magicui/icon-cloud";

// Cleaner animation variants - reduced intensity
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
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
      damping: 30,
      stiffness: 200,
    },
  },
};

// Subtle gradient orb - less intrusive
const GradientOrb = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full opacity-10 blur-3xl pointer-events-none ${className}`}
  />
);

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const { locale } = useLocale();
  const t = useTranslations("hero");
  const tAbout = useTranslations("about");
  const tWork = useTranslations("work");
  const tProjects = useTranslations("projects");
  const tSkills = useTranslations("skills");
  const tContact = useTranslations("contact");

  // Fetch data from database with fallback to static data
  const {
    name,
    description,
    summary,
    skills,
    work,
    featuredProjectsFormatted,
    socials,
    isLoading,
  } = usePortfolioData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      {/* Subtle Gradient Orbs */}
      <GradientOrb className="w-96 h-96 bg-purple-500 top-20 -left-48" />
      <GradientOrb className="w-96 h-96 bg-blue-500 top-96 -right-48" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8 max-w-5xl mx-auto"
          >
            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {t("greeting")} {name.split(" ")[0]}
                </span>
                <span className="block text-3xl md:text-5xl mt-4 text-muted-foreground font-light">
                  👋
                </span>
              </h1>
            </motion.div>

            {/* Tagline - Better than "helping people" */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed text-muted-foreground font-light"
            >
              {t("tagline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <CVDownloadButton />

              <motion.a
                href="#contact"
                className="group flex items-center gap-3 px-8 py-4 text-lg font-medium text-foreground border-2 border-primary/20 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                {t("letsConnect")}
              </motion.a>
            </motion.div>

            {/* Social Links - GitHub & LinkedIn only */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 pt-8"
            >
              {[
                {
                  icon: Github,
                  href: socials.GitHub?.url || DATA.contact.social.GitHub.url,
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href:
                    socials.LinkedIn?.url || DATA.contact.social.LinkedIn.url,
                  label: "LinkedIn",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator - Centered properly */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center mt-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="text-sm font-medium">
                {t("scrollToExplore")}
              </span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    {tAbout("title")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {tAbout("craftingDigitalExperiences")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {tAbout("passionateDeveloper")}
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants}>
                  <div className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert">
                    <Markdown>
                      {getTranslatedText(DATA.summary, locale as Locale)}
                    </Markdown>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                  <div className="relative glass-card rounded-3xl p-8 space-y-8 bg-card/50 backdrop-blur-sm border border-border/40">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          label: tAbout("experienceYears"),
                          value: tAbout("experienceValue"),
                          icon: Award,
                        },
                        {
                          label: tAbout("projectsCount"),
                          value: `${DATA.featuredProjects.length}+`,
                          icon: Code,
                        },
                        {
                          label: tAbout("technologiesCount"),
                          value: `${DATA.skills.length}+`,
                          icon: Zap,
                        },
                        {
                          label: tAbout("coffeeCups"),
                          value: tAbout("coffeeCupsValue"),
                          icon: Sparkles,
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className="text-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-3">
                            <stat.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-primary mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-5xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    {tAbout("experience")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {tWork("professionalJourney")}
                </h2>
              </motion.div>

              <div className="space-y-6">
                {work.map((workItem: any) => (
                  <motion.div
                    key={workItem.company}
                    variants={itemVariants}
                    className="group"
                  >
                    <ResumeCard
                      logoUrl={workItem.logoUrl}
                      altText={workItem.company}
                      title={workItem.company}
                      subtitle={getTranslatedText(
                        workItem.title,
                        locale as Locale
                      )}
                      href={workItem.href}
                      badges={workItem.badges}
                      period={`${workItem.start} - ${
                        workItem.end ?? tWork("current")
                      }`}
                      description={getTranslatedText(
                        workItem.description,
                        locale as Locale
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    {tSkills("title")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {tProjects("technologiesAndTools")}
                </h2>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {tSkills("description")}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        viewport={{ once: true }}
                      >
                        <Badge className="text-sm py-2 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 cursor-default border border-purple-500/20">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
                  <div className="relative h-[350px] flex items-center justify-center">
                    <IconCloud
                      iconSlugs={[
                        "php",
                        "laravel",
                        "python",
                        "django",
                        "nodejs",
                        "express",
                        "nestjs",
                        "mongodb",
                        "postgresql",
                        "mysql",
                        "firebase",
                        "javascript",
                        "typescript",
                        "react",
                        "tailwindcss",
                        "dart",
                        "flutter",
                        "java",
                        "kotlin",
                        "git",
                        "github",
                        "docker",
                      ]}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-7xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    {tProjects("featuredWork")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {tProjects("myLatestProjects")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {tProjects("projectsDescription")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredProjectsFormatted.map((project: any) => (
                  <motion.div
                    key={project.slug}
                    variants={itemVariants}
                    className="group"
                  >
                    <ProjectCard
                      href={`/projects/${project.slug}`}
                      title={getTranslatedText(project.title, locale as Locale)}
                      description={getTranslatedText(
                        project.description,
                        locale as Locale
                      )}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      links={project.links}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    {tContact("letsConnect")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {tContact("getInTouch")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {tContact("contactDescription")}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-3xl p-8">
                  <ContactFormComponent />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
