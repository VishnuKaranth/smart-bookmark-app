'use client'

import { useEffect, useState, useTransition } from 'react'
import { createClient } from '@/utils/supabase/client'
import { deleteBookmark } from '@/app/actions'
import { Trash2, ExternalLink, Activity, Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
    user_id: string
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const [searchQuery, setSearchQuery] = useState('')
    const [isPending, startTransition] = useTransition()
    const supabase = createClient()

    useEffect(() => {
        setBookmarks(initialBookmarks)
    }, [initialBookmarks])

    useEffect(() => {
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== (payload.old as Bookmark).id))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    const filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search your library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-input rounded-xl bg-secondary/20 hover:bg-secondary/40 focus:bg-background focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-muted-foreground outline-none"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {bookmarks.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-24 border border-dashed border-border/50 rounded-3xl bg-secondary/5 backdrop-blur-sm mx-auto max-w-lg relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Activity className="text-primary/50 mb-6 group-hover:text-primary group-hover:scale-110 transition-all duration-500" size={48} strokeWidth={1} />
                    <h3 className="text-xl font-light tracking-wide text-foreground relative z-10">Library Empty</h3>
                    <p className="text-muted-foreground/70 text-sm mt-3 font-light tracking-wide relative z-10">Begin your collection above</p>
                </motion.div>
            ) : filteredBookmarks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    No bookmarks found matching &quot;{searchQuery}&quot;
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredBookmarks.map((bookmark) => (
                            <motion.div
                                layout
                                key={bookmark.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="group relative bg-card border border-border p-5 rounded-2xl hover:border-primary/50 transition-colors duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button
                                        onClick={() => startTransition(() => deleteBookmark(bookmark.id))}
                                        className="bg-red-500/10 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                                        <img
                                            src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`}
                                            alt=""
                                            className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/globe.svg' // Fallback
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1" title={bookmark.title}>{bookmark.title}</h3>
                                        <p className="text-xs text-muted-foreground font-mono">
                                            {new Date(bookmark.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full p-3 bg-secondary/30 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all font-mono group-hover:pl-4"
                                >
                                    <span className="truncate max-w-[200px]">{new URL(bookmark.url).hostname}</span>
                                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}
