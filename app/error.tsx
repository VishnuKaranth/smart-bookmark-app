'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-background text-foreground p-6">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[120px]" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            </div>

            <div className="relative z-10 max-w-md w-full bg-card/50 backdrop-blur-xl border border-red-500/20 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <AlertTriangle size={32} />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-bold">System Malfunction</h2>
                    <p className="text-muted-foreground text-sm">
                        {error.message || "An unexpected error occurred while processing your request."}
                    </p>
                </div>

                <button
                    onClick={reset}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                    <RefreshCw size={18} />
                    <span>Retry Connection</span>
                </button>
            </div>
        </div>
    )
}
