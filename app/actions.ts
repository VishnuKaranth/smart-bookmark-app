'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) return

    const supabase = await createClient()
    const { error } = await supabase.from('bookmarks').insert({ title, url })

    if (error) {
        console.error('Error adding bookmark:', error)
    }

    revalidatePath('/')
}

export async function deleteBookmark(id: string) {
    const supabase = await createClient()
    await supabase.from('bookmarks').delete().eq('id', id)

    revalidatePath('/')
}
