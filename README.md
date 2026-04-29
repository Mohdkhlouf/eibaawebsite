# Personal Blog & Portfolio — Social Worker Website

A full-stack web application built for a social worker to share her work, knowledge, and content with her audience — all manageable by herself through a built-in dashboard, no technical knowledge required.

The **public website is in Arabic** (RTL layout), tailored for her Arabic-speaking audience. The **admin dashboard is in English** to keep it clean and general-purpose.

---

## ✨ What the Site Offers

### 🌐 Public Website (Arabic / RTL)

- **Blog** — Articles and posts in Arabic
- **Services** — Her professional services described in Arabic
- **Courses** — Online or in-person courses she runs
- **Instagram Feed** — Her latest Instagram posts embedded on the site
- **Podcast / SoundCloud** — Her podcast episodes embedded from SoundCloud
- **Social Media Links** — Links to all her social profiles

### 🛠️ Admin Dashboard (English)

Only accessible after login. Lets her manage all site content herself:

| Section      | What she can do                                   |
| ------------ | ------------------------------------------------- |
| Blogs        | Add, edit, and delete blog posts                  |
| Categories   | Organize blogs into categories                    |
| Services     | Add and update the services she offers            |
| Courses      | Add and manage courses                            |
| Social Media | Update her Instagram, SoundCloud, and other links |

---

## 🌍 Language & Localization

| Area            | Language | Direction           |
| --------------- | -------- | ------------------- |
| Public website  | Arabic   | RTL (Right-to-Left) |
| Admin dashboard | English  | LTR (Left-to-Right) |

The dashboard layout is explicitly set to `lang="en" dir="ltr"` in `layout.tsx`, keeping it visually separate from the Arabic public site. Arabic content (blog posts, service descriptions, etc.) is written by the site owner through the dashboard forms and stored as-is in the database.

---

## 🛠️ Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org/) (App Router)         |
| Language         | TypeScript                                          |
| Styling          | Tailwind CSS                                        |
| Rich Text Editor | Tiptap (ProseMirror) — supports Arabic input        |
| Forms            | React Hook Form                                     |
| Validation       | Zod                                                 |
| Image Uploads    | Cloudinary                                          |
| Auth             | [Supabase Auth](https://supabase.com/auth)          |
| Database         | PostgreSQL via [Prisma ORM](https://www.prisma.io/) |
| Backend BaaS     | [Supabase](https://supabase.com)                    |
| Package Manager  | npm                                                |

---

## 🚀 Getting Started (Developer Setup)

### Prerequisites

- Node.js 18+
- pnpm
- A [Supabase](https://supabase.com) project
- A PostgreSQL database

### 1. Clone & Install

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
pnpm install
```

### 2. Environment Variables

Fill in your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the Arabic public site.  
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the English admin dashboard (login required).

---

## 🏗️ Project Structure

```
.
├── app/                        # Next.js App Router
│   ├── (public)/               # Arabic public-facing website (RTL)
│   └── dashboard/              # English admin dashboard (LTR, protected)
│       ├── layout.tsx          # Auth guard + sets lang="en" dir="ltr"
│       ├── page.tsx            # Dashboard home — sidebar + dynamic content area
│       └── dashboard.css       # Dashboard styles and theme variables
│
├── actions/                    # Next.js Server Actions (form submissions, data mutations)
├── components/
│   └── dashboard/
│       ├── DashboardHeader.tsx
│       ├── DashboardFooter.tsx
│       ├── DashboardSidebar.tsx
│       ├── lists/              # Content listing views (blogs, categories, courses, users)
│       └── forms/              # Add/edit forms (blogs, categories, courses, users)
│
├── hooks/                      # Custom React hooks
├── lib/                        # Supabase client, Prisma client
├── prisma/                     # Database schema and migrations
├── supabase/                   # Supabase local dev configuration
└── public/                     # Static assets (images, icons)
```

### How the Dashboard Routing Works

The dashboard uses URL query params to control what's displayed — no separate pages needed:

```
/dashboard                               → Welcome screen
/dashboard?section=blogs                 → Blog posts list
/dashboard?section=blogs&action=add      → Add new blog post
/dashboard?section=blogs&action=edit     → Edit a blog post
/dashboard?section=categories            → Categories list
/dashboard?section=services              → Services list
/dashboard?section=courses               → Courses list
/dashboard?section=social                → Manage social media links
```

---

## 🔐 Authentication

The dashboard is protected server-side via Supabase Auth. Any visitor who isn't logged in is immediately redirected to `/login`. There is one admin user — the site owner.

---

## 🤝 Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-change
   ```

2. Keep content mutation logic in `actions/` and UI in `components/dashboard/`

3. For new dashboard sections, add:
   - A list component in `components/dashboard/lists/`
   - A form component in `components/dashboard/forms/`
   - A new case in `renderContent()` in `app/dashboard/page.tsx`
   - A sidebar link in `DashboardSidebar.tsx`

4. For public site changes, keep Arabic text within the content (fetched from DB) — don't hardcode Arabic strings in components unless they are static UI labels.

5. Test locally, then open a Pull Request.

---

## 📄 License

Private project — all rights reserved.
