'use client'

import { loginWithGoogle, logout } from '@/app/auth/actions'
import { User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon } from 'lucide-react'

export default function AuthButton({ user }: { user: User | null }) {
    if (user) {
        return (
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold tracking-tight text-foreground">
                        {user.user_metadata.full_name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                        CONNECTED
                    </span>
                </div>
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-ring rounded-full blur opacity-75" />
                    <div className="relative h-10 w-10 rounded-full bg-background flex items-center justify-center border border-border">
                        {user.user_metadata.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full rounded-full object-cover" />
                        ) : (
                            <UserIcon size={18} className="text-foreground" />
                        )}
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className="bg-secondary/20 hover:bg-secondary/30 border border-border text-foreground p-2 rounded-lg transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => loginWithGoogle()}
            className="group relative px-6 py-2 bg-card overflow-hidden rounded-full border border-primary/50 transition-all hover:border-primary"
        >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
            <span className="relative text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Sign in with Google
            </span>
        </button>
    )
}
