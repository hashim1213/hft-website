import Link from "next/link"
import { ArrowRight, Check, type LucideIcon } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

type Capability = { title: string; description: string }
type Step = { title: string; description: string }

type CapabilityPageProps = {
  kicker: string
  title: string
  accent: string
  intro: string
  icon: LucideIcon
  capabilities: Capability[]
  steps: Step[]
  outcomes: string[]
}

export default function CapabilityPage({ kicker, title, accent, intro, icon: Icon, capabilities, steps, outcomes }: CapabilityPageProps) {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-black px-5 pb-20 pt-40 text-white md:px-10 md:pb-28 md:pt-48">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(116,143,255,.28),transparent_35%)]" />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10"><Icon className="h-5 w-5" strokeWidth={1.5} /></div>
            <p className="premium-kicker mt-10 text-white/45">{kicker}</p>
            <h1 className="mt-5 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.88] tracking-[-.075em]">{title}<br /><span className="hero-shine">{accent}</span></h1>
            <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">{intro}</p>
              <Link href="/contact" className="premium-button group w-fit bg-white text-black">Start a project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]">
            <p className="premium-kicker">What we do</p>
            <div className="mt-5 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <h2 className="text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">Built around<br /><span className="text-black/25">real work.</span></h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {capabilities.map((item, index) => <article key={item.title} className="rounded-[1.75rem] border border-black/[.06] bg-white p-7 md:p-9"><span className="text-xs font-semibold text-black/25">0{index + 1}</span><h3 className="mt-14 text-2xl font-semibold tracking-[-.035em]">{item.title}</h3><p className="mt-3 leading-relaxed text-black/50">{item.description}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="premium-kicker">How it happens</p><h2 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">One clear path.<br /><span className="text-black/25">No handoffs.</span></h2></div>
            <div className="divide-y divide-black/10 border-y border-black/10">{steps.map((step, index) => <div key={step.title} className="grid gap-3 py-8 sm:grid-cols-[3rem_1fr]"><span className="text-sm text-black/30">0{index + 1}</span><div><h3 className="text-2xl font-semibold tracking-[-.035em]">{step.title}</h3><p className="mt-2 max-w-xl leading-relaxed text-black/50">{step.description}</p></div></div>)}</div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-black p-8 text-white md:p-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-end"><div><p className="premium-kicker text-white/40">The result</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] md:text-6xl">Technology that earns its place.</h2></div><ul className="grid gap-4 sm:grid-cols-2">{outcomes.map(item => <li key={item} className="flex items-center gap-3 text-white/65"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black"><Check className="h-3.5 w-3.5" /></span>{item}</li>)}</ul></div>
          </div>
        </section>

        <section className="bg-white px-5 py-28 text-center md:px-10 md:py-40"><p className="premium-kicker">Have something ambitious in mind?</p><h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-8xl">Let&apos;s make the complex feel simple.</h2><Link href="/contact" className="premium-button group mt-9 bg-black text-white">Talk to our team <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></section>
      </main>
      <Footer />
    </div>
  )
}
