# Deployment Debug Checklist needed

If Google Login is "doing nothing" or failing, it is 100% a configuration mismatch between Vercel, Supabase, and Google Cloud.

## 1. Google Cloud Console (The most common issue)
*   Go to **APIs & Services** > **Credentials**.
*   Click your **OAuth 2.0 Client ID**.
*   **Authorized JavaScript origins**: `https://<your-supabase-project>.supabase.co` AND `https://smart-bookmark-app-two-black.vercel.app`
*   **Authorized redirect URIs**:
    *   `https://<your-supabase-project>.supabase.co/auth/v1/callback`  <-- **THIS IS CRITICAL**. It must match your Supabase project domain, NOT your Vercel domain.

## 2. Supabase Dashboard
*   Go to **Authentication** > **URL Configuration**.
*   **Site URL**: `https://smart-bookmark-app-two-black.vercel.app`
*   **Redirect URLs**: Add `https://smart-bookmark-app-two-black.vercel.app/auth/callback`
*   **Save**.

## 3. Vercel Environment Variables
*   Go to **Settings** > **Environment Variables**.
*   Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct.
*   (Optional but recommended) Add `NEXT_PUBLIC_BASE_URL` = `https://smart-bookmark-app-two-black.vercel.app`

## 4. Check Logs
I have added logging to the code.
1. Go to Vercel Dashboard > **Logs**.
2. Click the Login button on your app.
3. Look for: `Attempting login with redirect URL: ...`
4. If you see an error, it will appear there.
