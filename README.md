# Smart Bookmark Manager

A clean, performant bookmark manager built with **Next.js 15 (App Router)** and **Supabase**.

This project focuses on providing a fast, distraction-free interface for managing links. It implements full-stack best practices including server-side auth, row-level security, and optimistic UI updates.

## Key Features

*   **Authentication**: Google OAuth integration via Supabase Auth with secure session handling.
*   **Database Security**: Strict Row Level Security (RLS) policies ensure users can only access their own data.
*   **Real-time Sync**: Bookmarks update instantly across devices using Supabase Realtime subscriptions.
*   **Theming**: 6 distinct themes including high-contrast and dark modes, built with Tailwind CSS variables.
*   **Performance**:
    *   Server Components for initial data load.
    *   Optimistic updates for immediate UI feedback.
    *   Dynamic Open Graph images for social sharing.

## Tech Stack

*   **Frontend**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion
*   **Backend**: Supabase (PostgreSQL, Auth, Realtime)
*   **State**: React Server Actions & Hooks
*   **Deployment**: Vercel ready

## Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/your-username/smart-bookmark-app.git
    cd smart-bookmark-app
    npm install
    ```

2.  **Environment Variables**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

3.  **Database Guidelines**
    The app requires a `bookmarks` table with RLS enabled.
    
    ```sql
    create table bookmarks (
      id uuid default gen_random_uuid() primary key,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      title text not null,
      url text not null,
      user_id uuid references auth.users not null default auth.uid()
    );
    
    alter table bookmarks enable row level security;
    
    create policy "Users can view own items" on bookmarks for select using (auth.uid() = user_id);
    create policy "Users can insert own items" on bookmarks for insert with check (auth.uid() = user_id);
    create policy "Users can delete own items" on bookmarks for delete using (auth.uid() = user_id);
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## License

MIT
