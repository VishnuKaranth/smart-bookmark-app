import { createClient } from '@/utils/supabase/server'
import AuthButton from '@/components/AuthButton'
import BookmarkList from '@/components/BookmarkList'
import AddBookmarkForm from '@/components/AddBookmarkForm'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let bookmarks: any[] = []
  if (user) {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: true })
    bookmarks = data || []
  }

  return (
    <main className="min-h-screen relative bg-background text-foreground selection:bg-primary/30 transition-colors duration-500">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-ring/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-20 bg-card/30 backdrop-blur-md p-4 rounded-2xl border border-border/50 sticky top-4 z-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-lg opacity-50" />
              <div className="relative h-10 w-10 bg-background border border-border rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-foreground rounded-full shadow-[0_0_10px_currentColor] text-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">SMART BOOKMARK</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <AuthButton user={user} />
          </div>
        </header>

        {!user ? (
          <div className="flex flex-col items-center text-center space-y-12 py-10">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/40 mb-6">
                Store your web<br />in one place.
              </h1>
              <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-primary to-ring opacity-20 -z-10" />
            </div>

            <p className="text-xl text-muted-foreground max-w-xl font-light leading-relaxed">
              Ever wanted an app where you could keep all your webpages?
              <span className="text-foreground font-medium"> Smart Bookmark is the place. Fast and Secure.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
              {[
                { title: "Access Anywhere", desc: "Your bookmarks on any device." },
                { title: "Safe & Secure", desc: "Your data is private and encrypted." },
                { title: "Easy to Use", desc: "Simple interface for your links." }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl text-left border-l-2 border-primary/50 hover:bg-foreground/5 transition-colors">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-1 rounded-3xl mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[20px]">
                <AddBookmarkForm />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-end justify-between border-b border-border/40 pb-4">
                <h2 className="text-3xl font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
                  Library
                </h2>
                <span className="font-mono text-xs tracking-widest text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-white/5">
                  {bookmarks.length} saved
                </span>
              </div>
              <BookmarkList initialBookmarks={bookmarks} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

