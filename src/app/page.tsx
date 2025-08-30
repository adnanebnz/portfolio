"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactFormComponent from "./components/contact-form";
import {
  Download,
  Briefcase,
  Code,
  User,
  Mail,
  Star,
  Award,
  Github,
  Linkedin,
  Twitter,
  ArrowDown,
  Sparkles,
  Zap,
  Rocket,
} from "lucide-react";
import IconCloud from "@/components/magicui/icon-cloud";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-20, -30, -20],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const GradientOrb = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute rounded-full opacity-20 blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />

      {/* Gradient Orbs */}
      <GradientOrb className="w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 top-20 -left-48" />
      <GradientOrb className="w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 top-96 -right-48" />
      <GradientOrb className="w-96 h-96 bg-gradient-to-r from-green-500 to-emerald-500 bottom-96 left-1/2" />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div
            style={{ y: textY }}
            className="container mx-auto px-4 text-center"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="relative">
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.2,
                  }}
                >
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
                    Hi, I'm {DATA.name.split(" ")[0]}
                  </span>
                  <motion.span
                    className="block text-4xl md:text-6xl lg:text-7xl mt-4 text-muted-foreground"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    👋
                  </motion.span>
                </motion.h1>

                <motion.div
                  className="absolute -top-10 -right-10 text-yellow-400"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-relaxed text-muted-foreground font-light"
              >
                {DATA.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.a
                  href="/pdf/CV-ADNANE-BENZERDJEB.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Download Resume
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="group flex items-center gap-3 px-8 py-4 text-lg font-medium text-foreground border-2 border-primary/20 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                  Let's Connect
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex justify-center gap-6 mt-12"
              >
                {[
                  { icon: Github, href: DATA.contact.social.GitHub.url },
                  { icon: Linkedin, href: DATA.contact.social.LinkedIn.url },
                  { icon: Twitter, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/50 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">About Me</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Crafting Digital Experiences
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Passionate developer with a love for creating beautiful,
                  functional, and user-centered digital experiences.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={itemVariants}>
                  <div className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert">
                    <Markdown>{DATA.summary}</Markdown>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
                  <div className="relative glass-card rounded-3xl p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        {
                          label: "Experience",
                          value: `${2}+ Years`,
                          icon: Award,
                        },
                        {
                          label: "Projects",
                          value: `${DATA.featuredProjects.length}+`,
                          icon: Code,
                        },
                        {
                          label: "Technologies",
                          value: `${DATA.skills.length}+`,
                          icon: Zap,
                        },
                        { label: "Coffee Cups", value: "∞", icon: Sparkles },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className="text-center group"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 group-hover:shadow-lg transition-all duration-300">
                            <stat.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-primary mb-2">
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
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Experience</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Professional Journey
                </h2>
              </motion.div>

              <div className="space-y-8">
                {DATA.work.map((work, index) => (
                  <motion.div
                    key={work.company}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <ResumeCard
                        logoUrl={work.logoUrl}
                        altText={work.company}
                        title={work.company}
                        subtitle={work.title}
                        href={work.href}
                        badges={work.badges}
                        period={`${work.start} - ${work.end ?? "Present"}`}
                        description={work.description}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Skills</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Technologies & Tools
                </h2>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className="space-y-8">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    I work with a diverse set of technologies to bring ideas to
                    life. From backend development to mobile apps, I love
                    exploring new tools and frameworks.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {DATA.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
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
                  <div className="relative h-[400px] flex items-center justify-center">
                    <IconCloud
                      iconSlugs={[
                        "php",
                        "laravel",
                        "livewire",
                        "python",
                        "django",
                        "fastapi",
                        "nodejs",
                        "express",
                        "adonisjs",
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
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-7xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    Featured Work
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  My Latest Projects
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex applications. Here are some of my
                  favorites that showcase my skills and passion for development.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {DATA.featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <ProjectCard
                          href={`/projects/${project.slug}`}
                          title={project.title}
                          description={project.description}
                          dates={project.dates}
                          tags={project.technologies}
                          image={project.image}
                          links={project.links}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">
                    Let's Connect
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Have a project in mind or just want to chat? I&apos;d love to
                  hear from you. Let&apos;s create something amazing together!
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                <div className="relative glass-card rounded-3xl p-8">
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
