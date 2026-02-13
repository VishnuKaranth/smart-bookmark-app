'use client'

import { useRef, useTransition } from 'react'
import { addBookmark } from '@/app/actions'
import { Plus, Loader2, ArrowRight } from 'lucide-react'

export default function AddBookmarkForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [isPending, startTransition] = useTransition()

    return (
        <form
            action={(formData) => {
                startTransition(async () => {
                    await addBookmark(formData)
                    formRef.current?.reset()
                })
            }}
            ref={formRef}
            className="flex flex-col gap-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative">
                    <div className="absolute inset-0 bg-secondary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        required
                        className="w-full bg-secondary/30 hover:bg-secondary/50 border border-transparent focus:border-primary/30 rounded-xl px-5 py-4 text-lg font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 relative z-10"
                    />
                </div>
                <div className="group relative">
                    <div className="absolute inset-0 bg-secondary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <input
                        name="url"
                        type="url"
                        placeholder="URL"
                        required
                        className="w-full bg-secondary/30 hover:bg-secondary/50 border border-transparent focus:border-ring/30 rounded-xl px-5 py-4 text-lg font-light tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring/20 transition-all duration-300 font-mono relative z-10"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-foreground to-foreground/80 text-background hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 font-medium tracking-wide rounded-xl disabled:opacity-50 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {isPending ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <div className="flex items-center gap-3 relative z-10">
                            <span>Add</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </button>
            </div>
        </form>
    )
}
