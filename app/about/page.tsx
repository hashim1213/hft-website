import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Users } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const values = [
  { title: "Listen before building", text: "The people closest to the work usually hold the most important product insights." },
  { title: "Clarity over complexity", text: "Technology should reduce cognitive load, not ask people to understand the machinery underneath." },
  { title: "Own the outcome", text: "We stay accountable from the first conversation through launch and long-term evolution." },
]

const team = [
  { name: "Hashim Farooq", role: "Founder & CEO", image: "/hashim.jpg", bio: "A product builder and entrepreneur with deep experience in agriculture, enterprise operations, and practical technology." },
  { name: "Bryce Cotton", role: "Software Engineer", image: "/Bryce.jpg", bio: "Building scalable, dependable products with modern engineering practices and a sharp eye for detail." },
  { name: "Specialist network", role: "Design, engineering & domain expertise", image: "/consultants.avif", bio: "Trusted specialists brought into the team when a product benefits from focused technical or industry knowledge." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-black px-5 pb-24 pt-40 text-white md:px-10 md:pb-32 md:pt-48">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(112,140,255,.3),transparent_35%)]" />
          <div className="relative mx-auto max-w-[1400px]">
            <p className="premium-kicker text-white/45">About Bytesavy</p>
            <h1 className="mt-6 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.88] tracking-[-.075em]">We make hard things<br /><span className="hero-shine">feel remarkably clear.</span></h1>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-7 md:grid-cols-2"><p className="max-w-xl text-lg leading-relaxed text-white/55 md:text-xl">Bytesavy is a Canadian product design and engineering studio for organizations doing essential, complicated work.</p><p className="max-w-xl text-lg leading-relaxed text-white/55 md:justify-self-end">We combine thoughtful design, rigorous engineering, and operational understanding to create software people genuinely want to use.</p></div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-10 md:py-40">
          <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div><p className="premium-kicker">Why we exist</p><h2 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-7xl">Essential industries deserve <span className="text-black/25">exceptional software.</span></h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-black/50">Too many critical teams still work around disconnected tools, aging systems, and products that were never designed for them. We started Bytesavy to change that—with modern technology grounded in the realities of the operation.</p></div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#eef0e9]"><Image src="/mission-image.jpg" alt="The Bytesavy team collaborating" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="premium-kicker">Our principles</p><h2 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-.055em] md:text-7xl">How we<br /><span className="text-black/25">show up.</span></h2></div><div className="grid gap-4 md:grid-cols-3">{values.map((value, index) => <article key={value.title} className="flex min-h-[310px] flex-col rounded-[1.75rem] bg-white p-7"><span className="text-xs font-semibold text-black/25">0{index + 1}</span><div className="mt-auto"><h3 className="text-2xl font-semibold tracking-[-.04em]">{value.title}</h3><p className="mt-3 leading-relaxed text-black/50">{value.text}</p></div></article>)}</div></div></div>
        </section>

        <section className="bg-white px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1400px]"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="premium-kicker">The team</p><h2 className="mt-5 text-5xl font-semibold tracking-[-.055em] md:text-7xl">Small by design.</h2></div><p className="max-w-lg text-lg leading-relaxed text-black/50">Senior people stay close to the work. When a project needs more depth, our specialist network expands the team—not the layers.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{team.map(member => <article key={member.name} className="overflow-hidden rounded-[1.75rem] bg-[#f5f5f7]"><div className="relative aspect-[4/3]"><Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top grayscale transition duration-500 hover:grayscale-0" /></div><div className="p-7"><p className="text-xs font-semibold uppercase tracking-[.15em] text-black/35">{member.role}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-.04em]">{member.name}</h3><p className="mt-3 leading-relaxed text-black/50">{member.bio}</p></div></article>)}</div>
            <div className="mt-5 grid gap-8 rounded-[1.75rem] bg-black p-8 text-white md:grid-cols-[auto_1fr] md:items-center md:p-10"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><Users className="h-6 w-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-white/35">The most important member</p><h3 className="mt-2 text-3xl font-semibold tracking-[-.04em]">You, the client.</h3><p className="mt-3 max-w-3xl leading-relaxed text-white/50">Your team brings the operational expertise. We bring product and technology expertise. The best work happens when those perspectives operate as one team.</p></div></div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1400px] rounded-[2rem] bg-white p-8 md:p-14"><div className="grid gap-12 lg:grid-cols-2 lg:items-end"><div><p className="premium-kicker">Our commitment</p><h2 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl">Practical from day one. Valuable for years.</h2></div><ul className="grid gap-4 sm:grid-cols-2">{["Direct access to the builders", "Progress you can see", "Decisions grounded in users", "Long-term product partnership"].map(item => <li key={item} className="flex items-center gap-3 text-black/55"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white"><Check className="h-3.5 w-3.5" /></span>{item}</li>)}</ul></div></div></section>

        <section className="relative overflow-hidden bg-black px-5 py-28 text-center text-white md:px-10 md:py-44"><div className="cta-orb absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2" /><div className="relative"><p className="premium-kicker text-white/45">Work with us</p><h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-8xl">Bring us the complexity.</h2><p className="mt-6 text-lg text-white/50">We&apos;ll help you find the clearest way forward.</p><Link href="/contact" className="premium-button group mt-9 bg-white text-black">Start a conversation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></div></section>
      </main>
      <Footer />
    </div>
  )
}
