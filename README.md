# AxomPrep Pro — Assam Study Platform

A production-oriented Next.js + Supabase study platform for Assam students.

## Included

- Supabase email/password authentication
- User profiles and admin roles
- Admin dashboard and content management
- Notes CMS with English + Assamese fields
- PDF upload path for Supabase Storage
- MCQ question bank
- Real timed mock tests
- Server-side scoring and attempt history
- Assam GK and Current Affairs content model
- Search/filter-ready database schema
- Bookmarks
- Row Level Security policies
- Responsive mobile-first UI
- Vercel deployment configuration

## 1. Create Supabase

Create a Supabase project, then open SQL Editor and run:

1. `supabase/schema.sql`
2. `supabase/seed.sql`

The current Supabase Next.js setup uses `@supabase/ssr` with cookie-based sessions.

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 3. Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 4. Create the first admin

Sign up normally at `/signup`.

Then in Supabase SQL Editor, run:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'YOUR_EMAIL');
```

Do not put a service-role key in the browser.

## 5. PDF uploads

Create the Storage bucket through `schema.sql`. Admins can upload PDFs from the Notes CMS. The app stores the object path in `notes.pdf_path`.

For a private bucket, generate signed URLs on the server before exposing a PDF to a user.

## 6. Deploy to Vercel

Push this folder to GitHub, import it into Vercel, add the two environment variables, and deploy.

Then set your Supabase Auth URL configuration to your production domain, for example:

`https://your-domain.vercel.app`

## Important

This repository is a complete production-oriented foundation, but you still need to connect your own Supabase project and populate your own Assam notes/questions/current-affairs content. No real database credentials are embedded.
