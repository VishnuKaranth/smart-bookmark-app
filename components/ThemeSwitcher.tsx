'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Check, Palette } from 'lucide-react'

const themes = [
    { id: 'stargate', name: 'Stargate', color: '#4c1d95' }, // violet-800
    { id: 'sunset', name: 'Sunset', color: '#db2777' }, // pink-600
    { id: 'matrix', name: 'Matrix', color: '#22c55e' }, // green-500
    { id: 'nordic', name: 'Nordic', color: '#64748b' }, // slate-500
    { id: 'sakura', name: 'Sakura', color: '#f472b6' }, // pink-400
    { id: 'midnight', name: 'Midnight', color: '#eab308' }, // yellow-500
]

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
        )
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl bg-secondary/50 hover:bg-secondary border border-border flex items-center justify-center transition-colors"
                aria-label="Toggle Theme"
            >
                <Palette size={20} className="text-foreground" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-card border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id)
                                    setIsOpen(false)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-secondary/50 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full border border-white/20"
                                        style={{ backgroundColor: t.color }}
                                    />
                                    <span className={`text-sm font-medium ${theme === t.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                        {t.name}
                                    </span>
                                </div>
                                {theme === t.id && <Check size={14} className="text-primary" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
