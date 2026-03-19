"use client";

import { useState, useEffect } from "react";
import { DATA, Locale } from "@/data/resume";
import { graphqlRequest } from "@/lib/graphql-client";

// Types for GraphQL response data
interface DBProfile {
    id: string;
    name: string;
    initials: string | null;
    url: string | null;
    location: string | null;
    locationLink: string | null;
    avatarUrl: string | null;
    descriptionEn: string;
    descriptionFr: string;
    summaryEn: string;
    summaryFr: string;
    contact: {
        id: string;
        email: string;
        phone: string | null;
        socials: DBSocial[];
    } | null;
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
    category: string | null;
    order: number;
}

interface DBWorkExperience {
    id: string;
    company: string;
    href: string | null;
    logoUrl: string | null;
    location: string;
    titleEn: string;
    titleFr: string;
    descriptionEn: string;
    descriptionFr: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    order: number;
    badges: string[];
}

interface DBEducation {
    id: string;
    school: string;
    href: string | null;
    logoUrl: string | null;
    degreeEn: string;
    degreeFr: string;
    descriptionEn: string | null;
    descriptionFr: string | null;
    startDate: string;
    endDate: string | null;
}

interface DBProject {
    id: string;
    slug: string;
    titleEn: string;
    titleFr: string;
    subtitleEn: string | null;
    subtitleFr: string | null;
    descriptionEn: string;
    descriptionFr: string;
    href: string | null;
    dates: string | null;
    active: boolean;
    featured: boolean;
    order: number;
    posterImage: string | null;
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
    version: string | null;
    isActive: boolean;
}

interface DBReview {
    id: string;
    name: string;
    role: string | null;
    company: string | null;
    content: string;
    rating: number;
}

interface PortfolioData {
    profile: DBProfile | null;
    featuredProjects: DBProject[];
    cvFiles: DBCVFile[];
    reviews: DBReview[];
    isLoading: boolean;
    error: string | null;
}

const PORTFOLIO_QUERY = `
  query PortfolioData {
    portfolioData {
      profile {
        id name initials url location locationLink avatarUrl
        descriptionEn descriptionFr summaryEn summaryFr
        contact {
          id email phone
          socials { id name url icon showInNav }
        }
        skills { id name category order }
        work {
          id company href logoUrl location titleEn titleFr
          descriptionEn descriptionFr startDate endDate isCurrent order badges
        }
        education {
          id school href logoUrl degreeEn degreeFr
          descriptionEn descriptionFr startDate endDate
        }
      }
      featuredProjects {
        id slug titleEn titleFr subtitleEn subtitleFr descriptionEn descriptionFr
        href dates active featured order posterImage mobileAppImages webAppImages
        technologies
        links { id type href icon }
      }
      cvFiles { id language fileName filePath version isActive }
      reviews { id name role company content rating }
    }
  }
`;

// Transform database work experience to match static data format
function transformWorkExperience(dbWork: DBWorkExperience[]) {
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
function transformProjects(dbProjects: DBProject[]) {
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
    name: string;
    description: { en: string; fr: string };
    summary: { en: string; fr: string };
    avatarUrl: string;
    skills: string[];
    work: ReturnType<typeof transformWorkExperience>;
    featuredProjectsFormatted: ReturnType<typeof transformProjects>;
    socials: { [key: string]: { url: string; icon: string } };
    contactEmail: string;
} {
    const [data, setData] = useState<{
        profile: DBProfile | null;
        featuredProjects: DBProject[];
        cvFiles: DBCVFile[];
        reviews: DBReview[];
    }>({
        profile: null,
        featuredProjects: [],
        cvFiles: [],
        reviews: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await graphqlRequest<{
                    portfolioData: {
                        profile: DBProfile | null;
                        featuredProjects: DBProject[];
                        cvFiles: DBCVFile[];
                        reviews: DBReview[];
                    };
                }>(PORTFOLIO_QUERY);

                setData(result.portfolioData);
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching portfolio data:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const profile = data.profile;

    const name = profile?.name || DATA.name;

    const description = profile
        ? { en: profile.descriptionEn, fr: profile.descriptionFr }
        : DATA.description;

    const summary = profile
        ? { en: profile.summaryEn, fr: profile.summaryFr }
        : DATA.summary;

    const avatarUrl = profile?.avatarUrl || DATA.avatarUrl;

    const skills = profile?.skills?.length
        ? profile.skills.map((s) => s.name)
        : DATA.skills;

    const work = profile?.work?.length
        ? transformWorkExperience(profile.work)
        : DATA.work;

    const featuredProjectsFormatted = data.featuredProjects?.length
        ? transformProjects(data.featuredProjects)
        : DATA.featuredProjects;

    const socials: { [key: string]: { url: string; icon: string } } = {};
    if (profile?.contact?.socials?.length) {
        profile.contact.socials.forEach((social) => {
            socials[social.name] = { url: social.url, icon: social.icon };
        });
    } else {
        Object.entries(DATA.contact.social).forEach(([key, value]) => {
            socials[key] = { url: value.url, icon: key.toLowerCase() };
        });
    }

    const contactEmail = profile?.contact?.email || DATA.contact.email;

    return {
        profile: data.profile,
        featuredProjects: data.featuredProjects,
        cvFiles: data.cvFiles,
        reviews: data.reviews,
        isLoading,
        error,
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
