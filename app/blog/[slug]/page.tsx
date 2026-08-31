import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getBlogPost } from "@/lib/blog"
import { plainText } from "@/lib/wordpress"

const fallback: Record<string, { title: string; date: string; excerpt: string; content: string }> = {
  "building-software-that-gets-used": { title: "How to build software your team will actually use", date: "2026-05-14", excerpt: "Why adoption—not feature count—is the clearest measure of a successful digital product.", content: "<p>Successful software does more than work—it fits naturally into the way people think and operate. That starts by involving users early, identifying the decisions that matter, and removing friction before adding features.</p><h2>Start with the work, not the technology</h2><p>The strongest product teams observe real workflows before proposing solutions. They prototype quickly, test assumptions with the people closest to the problem, and use what they learn to prioritize a focused first release.</p><h2>Measure meaningful adoption</h2><p>Usage, completion time, error reduction, and user confidence tell a clearer story than the number of features shipped. Build around those outcomes and the roadmap becomes easier to defend.</p>" },
  "ai-beyond-the-hype": { title: "AI beyond the hype: where automation creates value", date: "2026-04-22", excerpt: "A practical framework for finding high-value, low-risk opportunities inside your operations.", content: "<p>The best AI projects rarely begin with a model. They begin with a repetitive, expensive, or inconsistent workflow that has a clear owner and measurable outcome.</p><h2>Look for strong signals</h2><p>High document volume, repeated classification, manual data movement, and knowledge bottlenecks are useful indicators. Begin with a narrow workflow, keep a person in control, and measure the result before expanding.</p>" },
  "modernizing-without-disruption": { title: "Modernizing critical systems without disrupting work", date: "2026-03-18", excerpt: "A staged approach to replacing legacy technology while protecting business continuity.", content: "<p>Modernization does not need to be a big-bang replacement. A staged architecture can improve the experience and reduce operational risk while dependable parts of the existing system remain in place.</p><h2>Create a safe path forward</h2><p>Map dependencies, isolate high-value workflows, introduce stable APIs, and migrate in focused releases. Every stage should create value on its own and preserve a clear rollback path.</p>" },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  const item = post ? { title: plainText(post.title.rendered), excerpt: plainText(post.excerpt.rendered) } : fallback[slug]
  return item ? { title: item.title, description: item.excerpt } : { title: "Insight not found" }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  const item = post ? { title: plainText(post.title.rendered), excerpt: plainText(post.excerpt.rendered), date: post.date, content: post.content.rendered, author: post._embedded?.author?.[0]?.name } : fallback[slug]
  if (!item) notFound()

  const words = plainText(item.content).split(/\s+/).filter(Boolean).length
  const minutes = words ? `${Math.max(1, Math.round(words / 200))} min read` : null
  const author = ("author" in item && item.author) || "Bytesavy Team"

  return <div className="min-h-screen bg-white text-[#10130f]"><Header /><main id="main-content" className="pt-20"><article><header className="border-b border-black/10 bg-[#f6f7f2] px-5 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-3xl"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-black/50 hover:text-black"><ArrowLeft className="h-4 w-4" /> Bytesavy Blog</Link><h1 className="mt-10 text-4xl font-semibold leading-[1.05] tracking-[-.035em] md:text-5xl">{item.title}</h1><p className="mt-6 text-sm text-black/45">by <span className="font-medium text-black/65">{author}</span><span className="mx-2 text-black/20">|</span><time dateTime={item.date}>{new Date(item.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</time>{minutes && <><span className="mx-2 text-black/20">|</span>{minutes}</>}</p><p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/55 md:text-xl">{item.excerpt}</p></div></header><div className="px-5 py-14 md:px-10 md:py-20"><div className="article-content mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: item.content }} /></div></article></main><Footer /></div>
}
