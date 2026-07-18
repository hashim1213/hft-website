import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getAllBlogPosts } from "@/lib/blog"
import { plainText } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical thinking on software product design, engineering, AI, and digital transformation from Bytesavy.",
}

const fallbackPosts = [
  { id: 1, slug: "building-software-that-gets-used", date: "2026-05-14", title: { rendered: "How to build software your team will actually use" }, excerpt: { rendered: "Why adoption—not feature count—is the clearest measure of a successful digital product." }, content: { rendered: "" } },
  { id: 2, slug: "ai-beyond-the-hype", date: "2026-04-22", title: { rendered: "AI beyond the hype: where automation creates value" }, excerpt: { rendered: "A practical framework for finding high-value, low-risk opportunities inside your operations." }, content: { rendered: "" } },
  { id: 3, slug: "modernizing-without-disruption", date: "2026-03-18", title: { rendered: "Modernizing critical systems without disrupting work" }, excerpt: { rendered: "A staged approach to replacing legacy technology while protecting business continuity." }, content: { rendered: "" } },
]

export default async function BlogPage() {
  const publishedPosts = await getAllBlogPosts()
  const posts = publishedPosts.length ? publishedPosts : fallbackPosts
  const [featured, ...remaining] = posts

  return <div className="min-h-screen bg-[#f6f7f2] text-[#10130f]">
    <Header />
    <main id="main-content" className="pt-20">
      <section className="border-b border-black/10 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]"><p className="eyebrow">Ideas & insights</p><h1 className="mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.06em] md:text-8xl">Thinking for people building what’s next.</h1></div>
      </section>
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          {featured && <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[1.6rem] bg-[#10130f] text-white lg:grid-cols-2">
            <div className="flex min-h-[420px] flex-col justify-between p-8 md:p-12"><p className="font-mono text-xs uppercase tracking-[.18em] text-[#b9ff38]">Featured insight · {new Date(featured.date).toLocaleDateString("en-CA", { month: "long", year: "numeric" })}</p><div><h2 className="text-4xl font-semibold leading-tight tracking-[-.04em] md:text-6xl">{plainText(featured.title.rendered)}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">{plainText(featured.excerpt.rendered)}</p><span className="mt-9 inline-flex items-center gap-2 font-semibold">Read insight <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" /></span></div></div>
            <div className="hero-grid min-h-[320px] bg-[#b9ff38] p-10 text-black"><div className="flex h-full items-center justify-center"><span className="text-[10rem] font-semibold leading-none tracking-[-.1em] opacity-90">B.</span></div></div>
          </Link>}
          <div className="mt-6 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">{remaining.map((post, i) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex min-h-[340px] flex-col bg-white p-8 transition hover:bg-[#b9ff38]"><p className="font-mono text-xs uppercase tracking-widest text-black/40">0{i + 2} · {new Date(post.date).toLocaleDateString("en-CA", { month: "short", year: "numeric" })}</p><h2 className="mt-12 text-3xl font-semibold leading-tight tracking-[-.03em]">{plainText(post.title.rendered)}</h2><p className="mt-5 line-clamp-3 leading-relaxed text-black/55">{plainText(post.excerpt.rendered)}</p><ArrowRight className="mt-auto h-5 w-5 transition group-hover:translate-x-2" /></Link>)}</div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
}
