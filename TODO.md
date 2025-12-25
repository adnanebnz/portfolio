# Portfolio TODO

## ✅ Completed

- [x] Bilingual CV download button (EN/FR)
- [x] Add RDSI as current work experience (Sep 2025 - Present)
- [x] Translate all resume.tsx content to FR
- [x] Set up Prisma ORM with PostgreSQL
- [x] Create database schema for all content
- [x] Create seed data with all existing content
- [x] Add new projects: SmartClean, DA-Mall, Tawsil Star Expeditor
- [x] Create API routes for work experiences (CRUD)
- [x] Create API routes for projects (CRUD)
- [x] Set up Cloudinary for image uploads
- [x] Create image upload component
- [x] Create Resume Manager dashboard page

## 🔄 In Progress

- [ ] Run database migration (needs DATABASE_URL in .env)
- [ ] Seed database with data

## 📋 Backlog

- [ ] make rdv timetable

## 🚀 Setup Steps

1. Copy `.env.example` to `.env`
2. Add your DATABASE_URL (Supabase, Neon, or local PostgreSQL)
3. Add Cloudinary credentials
4. Run `pnpm db:generate` to generate Prisma client
5. Run `pnpm db:push` to push schema to database
6. Run `pnpm db:seed` to seed data
