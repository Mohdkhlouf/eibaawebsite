# Eibaa — Professional Services Platform

A full-stack web application for managing and showcasing professional services, courses, blogs, and content. Built with a public-facing Arabic website (RTL) and an English admin dashboard, fully manageable without technical knowledge.

The **public website is in Arabic** (RTL layout), tailored for Arabic-speaking audiences. The **admin dashboard is in English** for clean, general-purpose management.

---

## ✨ Features

### 🌐 Public Website (Arabic / RTL)

- **Blogs** — Articles and posts with rich text content
- **Services** — Professional services with descriptions and thumbnails
- **Courses** — Online or in-person courses with enrollments
- **Static Pages** — Custom pages managed by admin
- **Dynamic Menu** — Admin-controlled navigation menu
- **Social Media Links** — Links to social profiles
- **Instagram Feed** — Latest Instagram posts
- **Podcast / SoundCloud** — Embedded podcast episodes
- **Mobile Responsive** — Hamburger menu for small screens
- **Dark Mode Ready** — Tailwind CSS support

### 🛠️ Admin Dashboard (English)

Only accessible after login. Complete content management system:

| Section        | What you can do                                    |
| -------------- | -------------------------------------------------- |
| Blogs          | Add, edit, delete blog posts with rich text        |
| Categories     | Organize blogs into categories                     |
| Services       | Add, edit, delete services with thumbnails         |
| Courses        | Manage courses and view enrollments                |
| Static Pages   | Create custom pages with title, slug, and content  |
| Menu           | Manage site navigation (custom URLs or page links) |
| Social Media   | Update social profile links                        |
| Users          | View and manage user profiles                      |

---

## 🌍 Language & Localization

| Area            | Language | Direction           |
| --------------- | -------- | ------------------- |
| Public website  | Arabic   | RTL (Right-to-Left) |
| Admin dashboard | English  | LTR (Left-to-Right) |

The dashboard layout is explicitly set to `lang="en" dir="ltr"` in `layout.tsx`, keeping it visually separate from the Arabic public site. Arabic content (blog posts, service descriptions, etc.) is written by the site owner through the dashboard forms and stored as-is in the database.

---

## 🛠️ Tech Stack

| Layer               | Technology                                                  |
| ------------------- | ----------------------------------------------------------- |
| Framework           | [Next.js 16](https://nextjs.org/) (App Router)              |
| Language            | TypeScript                                                  |
| Styling             | Tailwind CSS                                                |
| Rich Text Editor    | Tiptap (ProseMirror) — supports Arabic, RTL, and images     |
| Form Management     | React Hook Form                                             |
| Validation          | Zod (schema-based, fully type-safe)                         |
| Image Uploads       | Cloudinary                                                  |
| Icons               | Lucide React                                                |
| Authentication      | [Supabase Auth](https://supabase.com/auth)                  |
| Database            | [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com) |
| Backend / BaaS      | [Supabase](https://supabase.com)                            |
| Package Manager     | npm                                                         |
| Deployment          | Vercel (recommended for Next.js)                            |

---

## 🚀 Getting Started (Developer Setup)

### Prerequisites

- Node.js 18+
- npm (11.12.1+)
- [Supabase](https://supabase.com) account (includes PostgreSQL database)
- Cloudinary account (for image uploads)

### 1. Clone & Install

```bash
git clone https://github.com/Mohdkhlouf/eibaawebsite.git
cd eibaawebsite
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

Get these values from:
- **Supabase Dashboard**: [https://app.supabase.com](https://app.supabase.com)
  - Project Settings > API > Project URL (NEXT_PUBLIC_SUPABASE_URL)
  - Project Settings > API > anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
  - Database > Connection pooling > PostgreSQL (DATABASE_URL)
- **Cloudinary Dashboard**: [https://cloudinary.com/console](https://cloudinary.com/console)
  - Account > Cloud Name (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public website.  
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the admin dashboard (login required).

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 🏗️ Project Structure

```
.
├── app/                              # Next.js App Router
│   ├── (app)/                        # Public-facing site (Arabic, RTL)
│   │   ├── layout.tsx                # App layout with Header/Footer
│   │   ├── page.tsx                  # Homepage
│   │   ├── blogs/                    # Blog listing and detail pages
│   │   ├── courses/                  # Course listing and detail pages
│   │   ├── services/                 # Service listing and detail pages
│   │   └── pages/                    # Dynamic static pages from admin
│   │
│   ├── (protected)/                  # Protected admin section
│   │   └── dashboard/                # Admin dashboard
│   │       ├── layout.tsx            # Auth guard + nav
│   │       └── page.tsx              # Dashboard router
│   │
│   ├── (auth)/                       # Authentication pages
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Registration page
│   │   └── callback/                 # Supabase auth callback
│   │
│   ├── api/                          # API routes
│   ├── onboarding/                   # User onboarding page
│   └── layout.tsx                    # Root layout
│
├── actions/                          # Server Actions
│   ├── blogs.ts                      # Blog CRUD
│   ├── services.ts                   # Service CRUD
│   ├── courses.ts                    # Course CRUD
│   ├── categories.ts                 # Category CRUD
│   ├── menu.ts                       # Menu management
│   ├── staticPages.ts                # Static page CRUD
│   ├── socialMediaLinks.ts           # Social link management
│   └── users.ts                      # User management
│
├── components/
│   ├── ui/                           # Reusable UI components
│   │   ├── Header.tsx                # Site header with mobile menu
│   │   ├── Footer.tsx                # Site footer
│   │   ├── MainMenu.tsx              # Dynamic navigation
│   │   ├── MobileMenuButton.tsx      # Mobile hamburger menu
│   │   ├── DataGrid.tsx              # Reusable table component
│   │   └── ...other UI components
│   │
│   ├── dashboard/                    # Dashboard-specific components
│   │   ├── DashboardHeader.tsx       # Dashboard header
│   │   ├── DashboardSidebar.tsx      # Navigation sidebar
│   │   ├── DashboardFooter.tsx       # Dashboard footer
│   │   ├── forms/                    # Add/edit form components
│   │   │   ├── BlogsForm.tsx
│   │   │   ├── ServicesForm.tsx
│   │   │   ├── CoursesForm.tsx
│   │   │   ├── CategoriesForm.tsx
│   │   │   ├── MenuForm.tsx
│   │   │   ├── StaticPageForm.tsx
│   │   │   └── ...more forms
│   │   └── lists/                    # List/table components
│   │       ├── BlogsList.tsx
│   │       ├── ServicesList.tsx
│   │       ├── CoursesList.tsx
│   │       ├── MenuList.tsx
│   │       └── ...more lists
│   │
│   ├── cards/                        # Card components (Blog, Service, Course)
│   ├── editor/                       # Tiptap editor components
│   ├── cloudinary/                   # Cloudinary upload component
│   └── featuredSections/             # Homepage featured sections
│
├── hooks/                            # Custom React hooks
│   └── use-mobile.ts
│
├── lib/                              # Utilities and clients
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # Authentication helpers
│   ├── types/                        # Zod schemas & TypeScript types
│   │   ├── blog.ts
│   │   ├── service.ts
│   │   ├── course.ts
│   │   ├── category.ts
│   │   ├── menu.ts
│   │   ├── staticPage.ts
│   │   ├── user.ts
│   │   └── socialMedia.ts
│   │
│   ├── supabase/                     # Supabase client configs
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client
│   │   └── middleware.ts             # Auth middleware
│   │
│   ├── cloudinary/                   # Cloudinary configs
│   └── utils.ts                      # Helper functions
│
├── prisma/                           # Database
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
│
├── public/                           # Static assets
└── styles/                           # Global styles

### How the Dashboard Routing Works

The dashboard uses URL query parameters to control what's displayed — no separate pages needed:

```
/dashboard                              → Welcome screen
/dashboard?section=blogs                → Blog posts list
/dashboard?section=blogs&action=add     → Add new blog post
/dashboard?section=blogs&action=edit&id=X  → Edit blog post
/dashboard?section=categories           → Categories list
/dashboard?section=services             → Services list
/dashboard?section=courses              → Courses list
/dashboard?section=pages                → Static pages list
/dashboard?section=menu                 → Menu management
/dashboard?section=socialMediaLinks     → Social media links
/dashboard?section=users                → Users list
```

---

## 🔐 Authentication & Authorization

- **Public Site**: No login required
- **Dashboard**: Protected by Supabase Auth
  - Users must login to access `/dashboard`
  - Non-authenticated users redirect to `/login`
  - Logout available from dashboard and header

Authentication flow:
1. User enters credentials on login page
2. Supabase Auth validates credentials
3. Session token stored in secure cookie
4. Middleware checks auth on protected routes
5. Logout clears session

---

## 📝 Form Management & Validation

All dashboard forms follow a consistent pattern using **React Hook Form** + **Zod**:

1. **Schema Definition** (`lib/types/`)
   - Each module has a Zod schema (e.g., `lib/types/blog.ts`)
   - Schemas define validation rules and types

2. **Server Actions** (`actions/`)
   - Receive form data from client
   - Validate using Zod schema
   - Perform database operation with Prisma
   - Return response to client

3. **Form Component** (`components/dashboard/forms/`)
   - Client component using `useForm()` + `zodResolver`
   - Real-time validation via React Hook Form
   - Submits to server action on form submit

This pattern ensures **type safety**, **validation at both client and server**, and clean separation of concerns.

---

## 🌐 i18n & RTL Support

- **Public Site**: Arabic (RTL)
  - HTML: `lang="ar" dir="rtl"`
  - Content: User-generated via dashboard
  - Uses Tiptap with RTL support

- **Dashboard**: English (LTR)
  - HTML: `lang="en" dir="ltr"`
  - Static UI labels: English only
  - User input: Can be any language

- **Mobile**: Hamburger menu with responsive design

---

## 🚀 Key Features & Patterns

### Server Actions
- All mutations use Next.js Server Actions (no separate API routes)
- Typed, validated on server before DB access
- Handles file uploads to Cloudinary

### Rich Text Editor
- Tiptap for blog/service/page content
- Supports Arabic and RTL text
- Exports to HTML for storage in database

### Image Management
- Cloudinary integration for all uploads
- Auto-resizing and optimization
- Accessible via URL for dynamic display

### Type Safety
- Zod for runtime validation
- TypeScript for compile-time checking
- Type-inferred forms from Zod schemas

---

## 🤝 Contributing

### Adding a New Dashboard Section

1. **Create the database model** in `prisma/schema.prisma`
   ```bash
   npx prisma migrate dev --name add_new_model
   ```

2. **Create the Zod schema** in `lib/types/newmodule.ts`
   ```typescript
   export const newModuleSchema = z.object({
     // validation rules
   })
   export type NewModule = z.infer<typeof newModuleSchema>
   ```

3. **Create server actions** in `actions/newmodule.ts`
   ```typescript
   export async function getNe wModules() { }
   export async function createNewModule(formData: FormData) { }
   // etc.
   ```

4. **Create the form** in `components/dashboard/forms/NewModuleForm.tsx`
   ```typescript
   export default function NewModuleForm() {
     const form = useForm({ resolver: zodResolver(newModuleSchema) })
     // form JSX
   }
   ```

5. **Create the list** in `components/dashboard/lists/NewModuleList.tsx`

6. **Add to dashboard routing** in `app/(protected)/dashboard/page.tsx`
   - Add case in switch statement
   - Add sidebar link

7. **Test locally** and push!

### Code Style

- No comments in code — code should be self-explanatory
- Use TypeScript strict mode
- Follow Tailwind CSS conventions
- Keep components focused and reusable

---

## 📚 Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

---

## 🔗 Useful Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Zod Docs](https://zod.dev)
- [React Hook Form Docs](https://react-hook-form.com)
- [Tiptap Editor Docs](https://tiptap.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---
