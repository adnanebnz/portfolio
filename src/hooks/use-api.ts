"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlRequest } from "@/lib/graphql-client";

// ============================================================================
// TYPES
// ============================================================================

export interface BlogPost {
    id: string;
    slug: string;
    titleEn: string;
    titleFr: string;
    summaryEn: string | null;
    summaryFr: string | null;
    contentEn: string;
    contentFr: string;
    coverImage: string | null;
    published: boolean;
    publishedAt: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface WorkExperience {
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
    createdAt: string;
    updatedAt: string;
}

export interface Education {
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
    createdAt: string;
    updatedAt: string;
}

export interface Project {
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
    keyFeaturesEn: string[];
    keyFeaturesFr: string[];
    links: ProjectLink[];
    createdAt: string;
    updatedAt: string;
}

export interface ProjectLink {
    id: string;
    type: string;
    href: string;
    icon: string;
}

export interface Skill {
    id: string;
    name: string;
    icon: string | null;
    category: string | null;
    order: number;
}

export interface Social {
    id: string;
    name: string;
    url: string;
    icon: string;
    showInNav: boolean;
}

export interface Review {
    id: string;
    name: string;
    role: string | null;
    company: string | null;
    content: string;
    rating: number;
    approved: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    read: boolean;
    replied: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Contact {
    id: string;
    email: string;
    phone: string | null;
    socials: Social[];
}

export interface Profile {
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
    contact: Contact | null;
    skills: Skill[];
    work: WorkExperience[];
    education: Education[];
}

export interface CVFile {
    id: string;
    language: string;
    fileName: string;
    filePath: string;
    version: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardStats {
    userCount: number;
    postCount: number;
    projectCount: number;
    workCount: number;
    messageCount: number;
    reviewCount: number;
}

// ============================================================================
// GRAPHQL FRAGMENTS
// ============================================================================

const BLOG_FIELDS = `
  id slug titleEn titleFr summaryEn summaryFr contentEn contentFr
  coverImage published publishedAt tags createdAt updatedAt
`;

const WORK_FIELDS = `
  id company href logoUrl location titleEn titleFr descriptionEn descriptionFr
  startDate endDate isCurrent order badges createdAt updatedAt
`;

const EDUCATION_FIELDS = `
  id school href logoUrl degreeEn degreeFr descriptionEn descriptionFr
  startDate endDate createdAt updatedAt
`;

const PROJECT_FIELDS = `
  id slug titleEn titleFr subtitleEn subtitleFr descriptionEn descriptionFr
  href dates active featured order posterImage mobileAppImages webAppImages
  technologies keyFeaturesEn keyFeaturesFr
  links { id type href icon }
  createdAt updatedAt
`;

const SKILL_FIELDS = `id name icon category order`;
const SOCIAL_FIELDS = `id name url icon showInNav`;
const REVIEW_FIELDS = `id name role company content rating approved featured createdAt updatedAt`;
const MESSAGE_FIELDS = `id name email subject message read replied createdAt updatedAt`;
const CVFILE_FIELDS = `id language fileName filePath version isActive createdAt updatedAt`;
const CONTACT_FIELDS = `id email phone socials { ${SOCIAL_FIELDS} }`;
const PROFILE_FIELDS = `
  id name initials url location locationLink avatarUrl
  descriptionEn descriptionFr summaryEn summaryFr
  contact { ${CONTACT_FIELDS} }
  skills { ${SKILL_FIELDS} }
  work { ${WORK_FIELDS} }
  education { ${EDUCATION_FIELDS} }
`;

// ============================================================================
// BLOG HOOKS
// ============================================================================

export function useBlogPosts(options?: {
    published?: boolean;
    limit?: number;
}) {
    return useQuery<BlogPost[]>({
        queryKey: ["blog-posts", options],
        queryFn: async () => {
            const data = await graphqlRequest<{ blogs: BlogPost[] }>(
                `query Blogs($publishedOnly: Boolean, $limit: Int) {
          blogs(publishedOnly: $publishedOnly, limit: $limit) { ${BLOG_FIELDS} }
        }`,
                { publishedOnly: options?.published, limit: options?.limit }
            );
            return data.blogs;
        },
    });
}

export function useBlogPost(slugOrId: string) {
    return useQuery<BlogPost>({
        queryKey: ["blog-post", slugOrId],
        queryFn: async () => {
            const data = await graphqlRequest<{ blogBySlug: BlogPost | null }>(
                `query BlogBySlug($slug: String!) {
          blogBySlug(slug: $slug) { ${BLOG_FIELDS} }
        }`,
                { slug: slugOrId }
            );
            if (data.blogBySlug) return data.blogBySlug;

            const byId = await graphqlRequest<{ blog: BlogPost }>(
                `query Blog($id: ID!) {
          blog(id: $id) { ${BLOG_FIELDS} }
        }`,
                { id: slugOrId }
            );
            return byId.blog;
        },
        enabled: !!slugOrId,
    });
}

export function useCreateBlogPost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            titleEn: string;
            titleFr: string;
            contentEn: string;
            contentFr: string;
            slug: string;
            summaryEn?: string;
            summaryFr?: string;
            coverImage?: string | null;
            published?: boolean;
            tags?: string[];
            authorId?: string;
        }) => {
            const finalInput = { authorId: "1", ...input };
            const data = await graphqlRequest<{ createBlog: BlogPost }>(
                `mutation CreateBlog($input: CreateBlogInput!) {
          createBlog(input: $input) { ${BLOG_FIELDS} }
        }`,
                { input: finalInput }
            );
            return data.createBlog;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
        },
    });
}

export function useUpdateBlogPost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            id,
            ...input
        }: { id: string } & Partial<{
            titleEn: string;
            titleFr: string;
            contentEn: string;
            contentFr: string;
            slug: string;
            summaryEn: string;
            summaryFr: string;
            coverImage: string | null;
            published: boolean;
            tags: string[];
        }>) => {
            const data = await graphqlRequest<{ updateBlog: BlogPost }>(
                `mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
          updateBlog(id: $id, input: $input) { ${BLOG_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateBlog;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
            queryClient.invalidateQueries({ queryKey: ["blog-post", data.id] });
            queryClient.invalidateQueries({ queryKey: ["blog-post", data.slug] });
        },
    });
}

export function useDeleteBlogPost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteBlog: boolean }>(
                `mutation DeleteBlog($id: ID!) { deleteBlog(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
        },
    });
}

// ============================================================================
// WORK EXPERIENCE HOOKS
// ============================================================================

export function useWorkExperiences() {
    return useQuery<WorkExperience[]>({
        queryKey: ["work-experiences"],
        queryFn: async () => {
            const data = await graphqlRequest<{ workExperiences: WorkExperience[] }>(
                `query { workExperiences { ${WORK_FIELDS} } }`
            );
            return data.workExperiences;
        },
    });
}

export function useCreateWorkExperience() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            company: string;
            location: string;
            titleEn: string;
            titleFr: string;
            descriptionEn: string;
            descriptionFr: string;
            startDate: string;
            href?: string;
            logoUrl?: string;
            endDate?: string;
            isCurrent?: boolean;
            order?: number;
            badges?: string[];
        }) => {
            const data = await graphqlRequest<{ createWorkExperience: WorkExperience }>(
                `mutation CreateWork($input: CreateWorkExperienceInput!) {
          createWorkExperience(input: $input) { ${WORK_FIELDS} }
        }`,
                { input }
            );
            return data.createWorkExperience;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
}

export function useUpdateWorkExperience() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{
            company: string;
            location: string;
            titleEn: string;
            titleFr: string;
            descriptionEn: string;
            descriptionFr: string;
            startDate: string;
            href: string;
            logoUrl: string;
            endDate: string;
            isCurrent: boolean;
            order: number;
            badges: string[];
        }>) => {
            const data = await graphqlRequest<{ updateWorkExperience: WorkExperience }>(
                `mutation UpdateWork($id: ID!, $input: UpdateWorkExperienceInput!) {
          updateWorkExperience(id: $id, input: $input) { ${WORK_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateWorkExperience;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
}

export function useDeleteWorkExperience() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteWorkExperience: boolean }>(
                `mutation DeleteWork($id: ID!) { deleteWorkExperience(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["work-experiences"] });
        },
    });
}

// ============================================================================
// EDUCATION HOOKS
// ============================================================================

export function useEducations() {
    return useQuery<Education[]>({
        queryKey: ["educations"],
        queryFn: async () => {
            const data = await graphqlRequest<{ educations: Education[] }>(
                `query { educations { ${EDUCATION_FIELDS} } }`
            );
            return data.educations;
        },
    });
}

export function useCreateEducation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            school: string;
            degreeEn: string;
            degreeFr: string;
            startDate: string;
            href?: string;
            logoUrl?: string;
            descriptionEn?: string;
            descriptionFr?: string;
            endDate?: string;
        }) => {
            const data = await graphqlRequest<{ createEducation: Education }>(
                `mutation CreateEdu($input: CreateEducationInput!) {
          createEducation(input: $input) { ${EDUCATION_FIELDS} }
        }`,
                { input }
            );
            return data.createEducation;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
        },
    });
}

export function useUpdateEducation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{
            school: string;
            degreeEn: string;
            degreeFr: string;
            startDate: string;
            href: string;
            logoUrl: string;
            descriptionEn: string;
            descriptionFr: string;
            endDate: string;
        }>) => {
            const data = await graphqlRequest<{ updateEducation: Education }>(
                `mutation UpdateEdu($id: ID!, $input: UpdateEducationInput!) {
          updateEducation(id: $id, input: $input) { ${EDUCATION_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateEducation;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
        },
    });
}

export function useDeleteEducation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteEducation: boolean }>(
                `mutation DeleteEdu($id: ID!) { deleteEducation(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
        },
    });
}

// ============================================================================
// PROJECT HOOKS
// ============================================================================

export function useProjects(options?: {
    featuredOnly?: boolean;
    activeOnly?: boolean;
}) {
    return useQuery<Project[]>({
        queryKey: ["projects", options],
        queryFn: async () => {
            const data = await graphqlRequest<{ projects: Project[] }>(
                `query Projects($featuredOnly: Boolean, $activeOnly: Boolean) {
          projects(featuredOnly: $featuredOnly, activeOnly: $activeOnly) { ${PROJECT_FIELDS} }
        }`,
                { featuredOnly: options?.featuredOnly, activeOnly: options?.activeOnly }
            );
            return data.projects;
        },
    });
}

export function useProject(slugOrId: string) {
    return useQuery<Project>({
        queryKey: ["project", slugOrId],
        queryFn: async () => {
            const data = await graphqlRequest<{ projectBySlug: Project | null }>(
                `query ProjectBySlug($slug: String!) {
          projectBySlug(slug: $slug) { ${PROJECT_FIELDS} }
        }`,
                { slug: slugOrId }
            );
            if (data.projectBySlug) return data.projectBySlug;

            const byId = await graphqlRequest<{ project: Project }>(
                `query Project($id: ID!) {
          project(id: $id) { ${PROJECT_FIELDS} }
        }`,
                { id: slugOrId }
            );
            return byId.project;
        },
        enabled: !!slugOrId,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            slug: string;
            titleEn: string;
            titleFr: string;
            descriptionEn: string;
            descriptionFr: string;
            ownerId?: string;
            subtitleEn?: string;
            subtitleFr?: string;
            href?: string;
            dates?: string;
            active?: boolean;
            featured?: boolean;
            order?: number;
            posterImage?: string;
            mobileAppImages?: string[];
            webAppImages?: string[];
            technologies?: string[];
            keyFeaturesEn?: string[];
            keyFeaturesFr?: string[];
            links?: { type: string; href: string; icon: string }[];
        }) => {
            const finalInput = { ownerId: "1", ...input };
            const data = await graphqlRequest<{ createProject: Project }>(
                `mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) { ${PROJECT_FIELDS} }
        }`,
                { input: finalInput }
            );
            return data.createProject;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export function useUpdateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{
            slug: string;
            titleEn: string;
            titleFr: string;
            subtitleEn: string;
            subtitleFr: string;
            descriptionEn: string;
            descriptionFr: string;
            href: string;
            dates: string;
            active: boolean;
            featured: boolean;
            order: number;
            posterImage: string;
            mobileAppImages: string[];
            webAppImages: string[];
            technologies: string[];
            keyFeaturesEn: string[];
            keyFeaturesFr: string[];
            links: { type: string; href: string; icon: string }[];
        }>) => {
            const data = await graphqlRequest<{ updateProject: Project }>(
                `mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
          updateProject(id: $id, input: $input) { ${PROJECT_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateProject;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", data.id] });
            queryClient.invalidateQueries({ queryKey: ["project", data.slug] });
        },
    });
}

export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteProject: boolean }>(
                `mutation DeleteProject($id: ID!) { deleteProject(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

// ============================================================================
// SKILL HOOKS
// ============================================================================

export function useSkills() {
    return useQuery<Skill[]>({
        queryKey: ["skills"],
        queryFn: async () => {
            const data = await graphqlRequest<{ skills: Skill[] }>(
                `query { skills { ${SKILL_FIELDS} } }`
            );
            return data.skills;
        },
    });
}

export function useCreateSkill() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: { name: string; icon?: string; category?: string; order?: number }) => {
            const data = await graphqlRequest<{ createSkill: Skill }>(
                `mutation CreateSkill($input: CreateSkillInput!) {
          createSkill(input: $input) { ${SKILL_FIELDS} }
        }`,
                { input }
            );
            return data.createSkill;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}

export function useUpdateSkill() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{ name: string; icon: string; category: string; order: number }>) => {
            const data = await graphqlRequest<{ updateSkill: Skill }>(
                `mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {
          updateSkill(id: $id, input: $input) { ${SKILL_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateSkill;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}

export function useDeleteSkill() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteSkill: boolean }>(
                `mutation DeleteSkill($id: ID!) { deleteSkill(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
        },
    });
}

// ============================================================================
// SOCIAL HOOKS
// ============================================================================

export function useSocials() {
    return useQuery<Social[]>({
        queryKey: ["socials"],
        queryFn: async () => {
            const data = await graphqlRequest<{ socials: Social[] }>(
                `query { socials { ${SOCIAL_FIELDS} } }`
            );
            return data.socials;
        },
    });
}

export function useCreateSocial() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: { name: string; url: string; icon: string; showInNav?: boolean }) => {
            const data = await graphqlRequest<{ createSocial: Social }>(
                `mutation CreateSocial($input: CreateSocialInput!) {
          createSocial(input: $input) { ${SOCIAL_FIELDS} }
        }`,
                { input }
            );
            return data.createSocial;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socials"] });
        },
    });
}

export function useUpdateSocial() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{ name: string; url: string; icon: string; showInNav: boolean }>) => {
            const data = await graphqlRequest<{ updateSocial: Social }>(
                `mutation UpdateSocial($id: ID!, $input: UpdateSocialInput!) {
          updateSocial(id: $id, input: $input) { ${SOCIAL_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateSocial;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socials"] });
        },
    });
}

export function useDeleteSocial() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteSocial: boolean }>(
                `mutation DeleteSocial($id: ID!) { deleteSocial(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["socials"] });
        },
    });
}

// ============================================================================
// REVIEW HOOKS
// ============================================================================

export function useReviews() {
    return useQuery<Review[]>({
        queryKey: ["reviews"],
        queryFn: async () => {
            const data = await graphqlRequest<{ reviews: Review[] }>(
                `query { reviews { ${REVIEW_FIELDS} } }`
            );
            return data.reviews;
        },
    });
}

export function useApprovedReviews() {
    return useQuery<Review[]>({
        queryKey: ["approved-reviews"],
        queryFn: async () => {
            const data = await graphqlRequest<{ approvedReviews: Review[] }>(
                `query { approvedReviews { ${REVIEW_FIELDS} } }`
            );
            return data.approvedReviews;
        },
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            name: string;
            content: string;
            rating: number;
            role?: string;
            company?: string;
            approved?: boolean;
            featured?: boolean;
        }) => {
            const data = await graphqlRequest<{ createReview: Review }>(
                `mutation CreateReview($input: CreateReviewInput!) {
          createReview(input: $input) { ${REVIEW_FIELDS} }
        }`,
                { input }
            );
            return data.createReview;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
}

export function useSubmitReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            name: string;
            content: string;
            rating: number;
            role?: string;
            company?: string;
        }) => {
            const data = await graphqlRequest<{ submitReview: Review }>(
                `mutation SubmitReview($input: SubmitReviewInput!) {
          submitReview(input: $input) { ${REVIEW_FIELDS} }
        }`,
                { input }
            );
            return data.submitReview;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
        },
    });
}

export function useUpdateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{
            name: string;
            role: string;
            company: string;
            content: string;
            rating: number;
            approved: boolean;
            featured: boolean;
        }>) => {
            const data = await graphqlRequest<{ updateReview: Review }>(
                `mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
          updateReview(id: $id, input: $input) { ${REVIEW_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateReview;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
        },
    });
}

export function useDeleteReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteReview: boolean }>(
                `mutation DeleteReview($id: ID!) { deleteReview(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
        },
    });
}

// ============================================================================
// CONTACT MESSAGE HOOKS
// ============================================================================

export function useMessages() {
    return useQuery<ContactMessage[]>({
        queryKey: ["messages"],
        queryFn: async () => {
            const data = await graphqlRequest<{ messages: ContactMessage[] }>(
                `query { messages { ${MESSAGE_FIELDS} } }`
            );
            return data.messages;
        },
    });
}

export function useSendMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            name: string;
            email: string;
            message: string;
            subject?: string;
        }) => {
            const data = await graphqlRequest<{ sendMessage: ContactMessage }>(
                `mutation SendMessage($input: SendMessageInput!) {
          sendMessage(input: $input) { ${MESSAGE_FIELDS} }
        }`,
                { input }
            );
            return data.sendMessage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
}

export function useUpdateMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...input }: { id: string } & Partial<{ read: boolean; replied: boolean }>) => {
            const data = await graphqlRequest<{ updateMessage: ContactMessage }>(
                `mutation UpdateMessage($id: ID!, $input: UpdateMessageInput!) {
          updateMessage(id: $id, input: $input) { ${MESSAGE_FIELDS} }
        }`,
                { id, input }
            );
            return data.updateMessage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
}

export function useDeleteMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await graphqlRequest<{ deleteMessage: boolean }>(
                `mutation DeleteMessage($id: ID!) { deleteMessage(id: $id) }`,
                { id }
            );
            return { id };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });
}

// ============================================================================
// PROFILE & CONTACT HOOKS
// ============================================================================

export function useProfile() {
    return useQuery<Profile | null>({
        queryKey: ["profile"],
        queryFn: async () => {
            const data = await graphqlRequest<{ profile: Profile | null }>(
                `query { profile { ${PROFILE_FIELDS} } }`
            );
            return data.profile;
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: Partial<{
            name: string;
            initials: string;
            url: string;
            location: string;
            locationLink: string;
            avatarUrl: string;
            descriptionEn: string;
            descriptionFr: string;
            summaryEn: string;
            summaryFr: string;
        }>) => {
            const data = await graphqlRequest<{ updateProfile: Profile }>(
                `mutation UpdateProfile($input: UpdateProfileInput!) {
          updateProfile(input: $input) { ${PROFILE_FIELDS} }
        }`,
                { input }
            );
            return data.updateProfile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["portfolio-data"] });
        },
    });
}

export function useUpdateContact() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: Partial<{ email: string; phone: string }>) => {
            const data = await graphqlRequest<{ updateContact: Contact }>(
                `mutation UpdateContact($input: UpdateContactInput!) {
          updateContact(input: $input) { ${CONTACT_FIELDS} }
        }`,
                { input }
            );
            return data.updateContact;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["portfolio-data"] });
        },
    });
}

// ============================================================================
// CV FILE HOOKS
// ============================================================================

export function useContact() {
    return useQuery<Contact | null>({
        queryKey: ["contact"],
        queryFn: async () => {
            const data = await graphqlRequest<{ contact: Contact | null }>(
                `query { contact { ${CONTACT_FIELDS} } }`
            );
            return data.contact;
        },
    });
}

export function useCVFiles(activeOnly?: boolean) {
    return useQuery<CVFile[]>({
        queryKey: ["cv-files", activeOnly],
        queryFn: async () => {
            const data = await graphqlRequest<{ cvFiles: CVFile[] }>(
                `query CVFiles($activeOnly: Boolean) {
          cvFiles(activeOnly: $activeOnly) { ${CVFILE_FIELDS} }
        }`,
                { activeOnly }
            );
            return data.cvFiles;
        },
    });
}

export function useCreateCVFile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: {
            language: string;
            fileName: string;
            filePath: string;
            version?: string;
            isActive?: boolean;
        }) => {
            const data = await graphqlRequest<{ createCVFile: CVFile }>(
                `mutation CreateCVFile($input: CreateCVFileInput!) {
          createCVFile(input: $input) { ${CVFILE_FIELDS} }
        }`,
                { input }
            );
            return data.createCVFile;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cv-files"] });
        },
    });
}

// ============================================================================
// DASHBOARD STATS HOOK
// ============================================================================

export function useDashboardStats() {
    return useQuery<DashboardStats>({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const data = await graphqlRequest<{ dashboardStats: DashboardStats }>(
                `query { dashboardStats { userCount postCount projectCount workCount messageCount reviewCount } }`
            );
            return data.dashboardStats;
        },
    });
}

// ============================================================================
// AUTH HOOKS
// ============================================================================

export function useChangePassword() {
    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
            const data = await graphqlRequest<{ changePassword: boolean }>(
                `mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
          changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
        }`,
                { currentPassword, newPassword }
            );
            return data.changePassword;
        },
    });
}
