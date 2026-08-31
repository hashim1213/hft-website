import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getAllBlogPosts } from "@/lib/blog"
import { plainText, type WordPressPost } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical thinking on software product design, engineering, AI, and digital transformation from Bytesavy.",
}

const fallbackPosts = [
  { id: 1, slug: "building-software-that-gets-used", date: "2026-05-14", title: { rendered: "How to build software your team will actually use" }, excerpt: { rendered: "Why adoption—not feature count—is the clearest measure of a successful digital product." }, content: { rendered: "" } },
  { id: 2, slug: "ai-beyond-the-hype", date: "2026-04-22", title: { rendered: "AI beyond the hype: where automation creates value" }, excerpt: { rendered: "A practical framework for finding high-value, low-risk opportunities inside your operations." }, content: { rendered: "" } },
  { id: 3, slug: "modernizing-without-disruption", date: "2026-03-18", title: { rendered: "Modernizing critical systems without disrupting work" }, excerpt: { rendered: "A staged approach to replacing legacy technology while protecting business continuity." }, content: { rendered: "" } },
]

const avatarGradients = [
  "linear-gradient(135deg, #7b5bff, #b944e0)",
  "linear-gradient(135deg, #3fa2ff, #7b5bff)",
  "linear-gradient(135deg, #ff5bb0, #7b5bff)",
  "linear-gradient(135deg, #2fd4c2, #3fa2ff)",
]

function postAuthor(post: WordPressPost) {
  return post._embedded?.author?.[0]?.name || "Bytesavy Team"
}

function isoDate(date: string) {
  return new Date(date).toISOString().slice(0, 10)
}

export default async function BlogPage() {
  const publishedPosts = await getAllBlogPosts()
  const posts = publishedPosts.length ? publishedPosts : fallbackPosts

  return <div className="min-h-screen bg-white text-[#10130f]">
    <Header />
    <main id="main-content" className="pt-20">
      <section className="border-b border-black/10 bg-[#f6f7f2] px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-[-.03em] md:text-5xl">Bytesavy Blog</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/55">Practical thinking on product design, engineering, and applied AI for the world&apos;s essential industries.</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm text-black/55">Displaying 1-{posts.length} ({posts.length})</p>
          <div className="mt-10 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {posts.map((post, index) => {
              const author = postAuthor(post)
              return <article key={post.slug}>
                <p className="flex items-center gap-2 font-mono text-sm text-black/70">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <time dateTime={post.date}>{isoDate(post.date)}</time>
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-.015em]">
                  <Link href={`/blog/${post.slug}`} className="text-[#0972d3] underline decoration-1 underline-offset-4 transition hover:text-[#064a86]">{plainText(post.title.rendered)}</Link>
                </h2>
                <p className="mt-4 line-clamp-4 text-[1.05rem] leading-relaxed text-black/70">{plainText(post.excerpt.rendered)}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: avatarGradients[index % avatarGradients.length] }}>{author.charAt(0).toUpperCase()}</span>
                    <span className="text-sm font-medium text-black/75">{author}</span>
                  </span>
                </div>
              </article>
            })}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
}
