export default function Loading() {
    return (
        <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
            {/* Ambient Background matching page.tsx to prevent flash */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-ring/20 blur-[120px]" />
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between mb-20 bg-card/30 backdrop-blur-md p-4 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/50 animate-pulse" />
                        <div className="h-6 w-32 bg-secondary/50 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary/50 animate-pulse" />
                        <div className="w-10 h-10 rounded-xl bg-secondary/50 animate-pulse" />
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="max-w-4xl mx-auto">
                    {/* Add Form Skeleton */}
                    <div className="glass-panel p-1 rounded-3xl mb-12 relative overflow-hidden">
                        <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[20px] h-[200px] animate-pulse" />
                    </div>

                    {/* List Skeleton */}
                    <div className="space-y-6">
                        <div className="flex items-end justify-between border-b border-border/40 pb-4">
                            <div className="h-8 w-24 bg-secondary/50 rounded animate-pulse" />
                            <div className="h-6 w-20 bg-secondary/50 rounded-full animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[160px] bg-secondary/30 rounded-2xl border border-border/50 animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
