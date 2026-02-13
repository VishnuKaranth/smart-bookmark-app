import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative bg-background text-foreground overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-ring/20 blur-[120px]" />
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            </div>

            <div className="relative z-10 text-center space-y-8 p-6">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-transparent opacity-50">
                    404
                </h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Lost in the Cosmos?</h2>
                    <p className="text-muted-foreground">The page you are looking for has drifted into a black hole.</p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300"
                >
                    <Home size={18} />
                    <span>Return to Orbit</span>
                </Link>
            </div>
        </div>
    )
}
