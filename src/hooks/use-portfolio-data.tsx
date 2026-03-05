"use client";

import { useState, useEffect } from "react";
import { DATA, Locale, getTranslatedText } from "@/data/resume";

// Types for database data
interface DBProfile {
  id: string;
  name: string;
  initials: string;
  url?: string;
  location: string;
  locationLink?: string;
  avatarUrl?: string;
  descriptionEn: string;
  descriptionFr: string;
  summaryEn: string;
  summaryFr: string;
  contact?: {
    id: string;
    email: string;
    phone?: string;
    socials: DBSocial[];
  };
  skills: DBSkill[];
  work: DBWorkExperience[];
  education: DBEducation[];
}

interface DBSocial {
  id: string;
  name: string;
  url: string;
  icon: string;
  showInNav: boolean;
}

interface DBSkill {
  id: string;
  name: string;
  category?: string;
  order: number;
}

interface DBWorkExperience {
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
  endDate?: string;
  isCurrent: boolean;
  order: number;
  badges: string[];
}

interface DBEducation {
  id: string;
  school: string;
  href?: string;
  logoUrl?: string;
  degreeEn: string;
  degreeFr: string;
  descriptionEn?: string;
  descriptionFr?: string;
  startDate: string;
  endDate?: string;
}

interface DBProject {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  subtitleEn?: string;
  subtitleFr?: string;
  descriptionEn: string;
  descriptionFr: string;
  href?: string;
  dates?: string;
  active: boolean;
  featured: boolean;
  order: number;
  posterImage?: string;
  mobileAppImages: string[];
  webAppImages: string[];
  technologies: string[];
  links: {
    id: string;
    type: string;
    href: string;
    icon: string;
  }[];
}

interface DBCVFile {
  id: string;
  language: string;
  fileName: string;
  filePath: string;
  version?: string;
  isActive: boolean;
}

interface PortfolioData {
  profile: DBProfile | null;
  featuredProjects: DBProject[];
  cvFiles: DBCVFile[];
  isLoading: boolean;
  error: string | null;
}

// Transform database work experience to match static data format
function transformWorkExperience(dbWork: DBWorkExperience[], locale: Locale) {
  return dbWork.map((work) => ({
    company: work.company,
    href: work.href || "",
    logoUrl: work.logoUrl || "",
    location: work.location,
    title: {
      en: work.titleEn,
      fr: work.titleFr,
    },
    description: {
      en: work.descriptionEn,
      fr: work.descriptionFr,
    },
    start: work.startDate,
    end: work.endDate || null,
    badges: work.badges,
  }));
}

// Transform database projects to match static data format
function transformProjects(dbProjects: DBProject[], locale: Locale) {
  return dbProjects.map((project) => ({
    slug: project.slug,
    title: {
      en: project.titleEn,
      fr: project.titleFr,
    },
    description: {
      en: project.descriptionEn,
      fr: project.descriptionFr,
    },
    dates: project.dates || "",
    technologies: project.technologies,
    image: project.posterImage || "",
    links: project.links.map((link) => ({
      type: link.type,
      href: link.href,
      icon: link.icon,
    })),
  }));
}

export function usePortfolioData(): PortfolioData & {
  // Transformed data ready for use
  name: string;
  description: { en: string; fr: string };
  summary: { en: string; fr: string };
  avatarUrl: string;
  skills: string[];
  work: any[];
  featuredProjectsFormatted: any[];
  socials: { [key: string]: { url: string; icon: string } };
  contactEmail: string;
} {
  const [data, setData] = useState<{
    profile: DBProfile | null;
    featuredProjects: DBProject[];
    cvFiles: DBCVFile[];
  }>({
    profile: null,
    featuredProjects: [],
    cvFiles: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/public");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching portfolio data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Use database data if available, otherwise fall back to static DATA
  const profile = data.profile;

  // Name
  const name = profile?.name || DATA.name;

  // Description
  const description = profile
    ? { en: profile.descriptionEn, fr: profile.descriptionFr }
    : DATA.description;

  // Summary
  const summary = profile
    ? { en: profile.summaryEn, fr: profile.summaryFr }
    : DATA.summary;

  // Avatar
  const avatarUrl = profile?.avatarUrl || DATA.avatarUrl;

  // Skills - from database or static
  const skills = profile?.skills?.length
    ? profile.skills.map((s) => s.name)
    : DATA.skills;

  // Work experience - from database or static
  const work = profile?.work?.length
    ? transformWorkExperience(profile.work, "en")
    : DATA.work;

  // Featured projects - from database or static
  const featuredProjectsFormatted = data.featuredProjects?.length
    ? transformProjects(data.featuredProjects, "en")
    : DATA.featuredProjects;

  // Socials - transform to object format
  const socials: { [key: string]: { url: string; icon: string } } = {};
  if (profile?.contact?.socials?.length) {
    profile.contact.socials.forEach((social) => {
      socials[social.name] = { url: social.url, icon: social.icon };
    });
  } else {
    // Fallback to static data
    Object.entries(DATA.contact.social).forEach(([key, value]) => {
      socials[key] = { url: value.url, icon: key.toLowerCase() };
    });
  }

  // Contact email
  const contactEmail = profile?.contact?.email || DATA.contact.email;

  return {
    profile: data.profile,
    featuredProjects: data.featuredProjects,
    cvFiles: data.cvFiles,
    isLoading,
    error,
    // Transformed data
    name,
    description,
    summary,
    avatarUrl,
    skills,
    work,
    featuredProjectsFormatted,
    socials,
    contactEmail,
  };
}
