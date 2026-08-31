import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getAllBlogPosts } from "@/lib/blog"
import { plainText, featuredImage, type WordPressPost } from "@/lib/wordpress"

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical thinking on software product design, engineering, AI, and digital transformation from Bytesavy.",
}

const fallbackPosts = [
  { id: 1, slug: "building-software-that-gets-used", date: "2026-05-14", title: { rendered: "How to build software your team will actually use" }, excerpt: { rendered: "Why adoption—not feature count—is the clearest measure of a successful digital product." }, content: { rendered: "" } },
  { id: 2, slug: "ai-beyond-the-hype", date: "2026-04-22", title: { rendered: "AI beyond the hype: where automation creates value" }, excerpt: { rendered: "A practical framework for finding high-value, low-risk opportunities inside your operations." }, content: { rendered: "" } },
  { id: 3, slug: "modernizing-without-disruption", date: "2026-03-18", title: { rendered: "Modernizing critical systems without disrupting work" }, excerpt: { rendered: "A staged approach to replacing legacy technology while protecting business continuity." }, content: { rendered: "" } },
]

function postAuthor(post: WordPressPost) {
  return post._embedded?.author?.[0]?.name || "Bytesavy Team"
}

function readingTime(post: WordPressPost) {
  const words = plainText(post.content.rendered).split(/\s+/).filter(Boolean).length
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : null
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-CA", { day: "numeric", month: "long", year: "numeric" })
}

export default async function BlogPage() {
  const publishedPosts = await getAllBlogPosts()
  const posts = publishedPosts.length ? publishedPosts : fallbackPosts

  return <div className="min-h-screen bg-white text-[#10130f]">
    <Header />
    <main id="main-content" className="pt-20">
      <section className="border-b border-black/10 bg-[#f6f7f2] px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-[-.03em] md:text-5xl">Bytesavy Blog</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/55">Practical thinking on product design, engineering, and applied AI for the world&apos;s essential industries.</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-4xl divide-y divide-black/10">
          {posts.map(post => {
            const image = featuredImage(post)
            const minutes = readingTime(post)
            return <article key={post.slug} className="py-10 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold leading-snug tracking-[-.02em] md:text-3xl">
                    <Link href={`/blog/${post.slug}`} className="transition hover:text-black/60">{plainText(post.title.rendered)}</Link>
                  </h2>
                  <p className="mt-3 text-sm text-black/45">
                    by <span className="font-medium text-black/65">{postAuthor(post)}</span>
                    <span className="mx-2 text-black/20">|</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {minutes && <><span className="mx-2 text-black/20">|</span>{minutes}</>}
                  </p>
                  <p className="mt-4 line-clamp-3 leading-relaxed text-black/60">{plainText(post.excerpt.rendered)}</p>
                  <Link href={`/blog/${post.slug}`} className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
                {image && <Link href={`/blog/${post.slug}`} className="relative block h-40 w-full shrink-0 overflow-hidden rounded-xl border border-black/[.06] sm:h-32 sm:w-48">
                  <Image src={image} alt={plainText(post.title.rendered)} fill unoptimized sizes="(max-width: 640px) 100vw, 192px" className="object-cover" />
                </Link>}
              </div>
            </article>
          })}
        </div>
      </section>
    </main>
    <Footer />
  </div>
}
