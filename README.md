# 🚀 Smart Bookmark Manager

> A modern, high-performance bookmark manager built with **Next.js 15 (App Router)** and **Supabase**.

Smart Bookmark Manager delivers a fast, secure, and distraction-free experience for saving and organizing links, powered by real-time synchronization and robust full-stack architecture.

---

## ✨ Highlights

* 🔐 **Secure Authentication** – Google OAuth via Supabase Auth with server-side session handling
* 🛡️ **Row Level Security (RLS)** – Strict policies ensure users access only their own data
* ⚡ **Real-time Sync** – Instant bookmark updates across devices using Supabase Realtime
* 🎨 **Advanced Theming** – 6 elegant themes including dark & high-contrast modes
* 🚀 **Performance First**

  * Server Components for fast initial load
  * Optimistic UI updates for instant feedback
  * Dynamic Open Graph images for rich sharing

---

## 🧱 Tech Stack

| Layer          | Technology                                                          |
| -------------- | ------------------------------------------------------------------- |
| **Frontend**   | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion |
| **Backend**    | Supabase (PostgreSQL, Auth, Realtime)                               |
| **State**      | React Server Actions & Hooks                                        |
| **Security**   | Supabase Row Level Security (RLS)                                   |
| **Deployment** | Vercel (Production Ready)                                           |

---

## 📂 Project Structure

```
smart-bookmark-app/
├── app/                # Next.js App Router pages & layouts
├── components/         # Reusable UI components
├── utils/              # Supabase & helper utilities
├── public/             # Static assets
├── styles/             # Global styles & themes
└── .env.local          # Environment variables
```

---

## ⚙️ Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
npm install
```

### 2️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3️⃣ Database Setup (Supabase)

The application requires a `bookmarks` table with Row Level Security enabled.

```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  user_id uuid references auth.users not null default auth.uid()
);

alter table bookmarks enable row level security;

create policy "Users can view own items"
on bookmarks for select
using (auth.uid() = user_id);

create policy "Users can insert own items"
on bookmarks for insert
with check (auth.uid() = user_id);

create policy "Users can delete own items"
on bookmarks for delete
using (auth.uid() = user_id);
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 Architecture Notes

* **Server Components** handle initial data fetching for optimal performance
* **Client Components** provide interactive UI with optimistic updates
* **Supabase Realtime** ensures live synchronization across sessions/devices
* **RLS Policies** enforce strict per-user data isolation at the database level

---

## 🚀 Deployment

This project is fully optimized for deployment on **Vercel**.

```bash
npm run build
```

Deploy via the Vercel dashboard or CLI.

---

## 📌 Roadmap

* 🔍 Bookmark search & filtering
* 📁 Folder-based organization
* 📱 Progressive Web App (PWA) support
* 🤖 AI-powered bookmark suggestions

---

## 👨‍💻 Author

**Vishnu Karanth**
Bengaluru, India

---

## 📜 License

Licensed under the **MIT License**.
