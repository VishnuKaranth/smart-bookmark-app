'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginWithGoogle() {
    const supabase = await createClient()

    const getURL = () => {
        let url =
            process.env.NEXT_PUBLIC_BASE_URL ?? // Set this to your site URL in production env.
            process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            process.env.VERCEL_URL ?? // Server-side Vercel URL
            'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
    }

    const redirectUrl = `${getURL()}auth/callback`
    console.log('Attempting login with redirect URL:', redirectUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectUrl,
        },
    })

    if (error) {
        console.error('Login error:', error)
        redirect('/error')
    }

    if (data.url) {
        console.log('Redirecting to Google:', data.url)
        redirect(data.url)
    }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}
