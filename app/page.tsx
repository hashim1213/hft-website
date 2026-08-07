import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bot, Cloud, Code2, Monitor, Smartphone, Sparkles } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WebsiteOffer from "@/components/WebsiteOffer"
import { getRecentBlogPosts } from "@/lib/blog"
import { plainText } from "@/lib/wordpress"

const industries = ["Agriculture", "Energy", "Resources", "Construction", "Manufacturing"]

const capabilities = [
  { icon: Sparkles, title: "Product design", text: "Experiences that make sophisticated systems feel natural from the very first interaction.", href: "/product" },
  { icon: Code2, title: "Software engineering", text: "Fast, resilient products designed for critical operations and engineered for years of growth.", href: "/development" },
  { icon: Bot, title: "Applied AI", text: "Intelligence woven into real workflows to remove friction, reveal insight, and accelerate decisions.", href: "/ai" },
  { icon: Smartphone, title: "Mobile app development", text: "Field-ready iOS and Android products built for speed, reliability, and effortless adoption.", href: "/mobile" },
]

const platforms = [
  { icon: Monitor, title: "Web", href: "/web" },
  { icon: Smartphone, title: "Mobile", href: "/mobile" },
  { icon: Cloud, title: "Cloud", href: "/development" },
  { icon: Bot, title: "AI", href: "/ai" },
]

const projects = [
  { number: "02", title: "Levy Platform", client: "Agricultural operations", type: "Enterprise software", statement: "Complex producer and payment workflows made remarkably clear.", image: "/levy-app.png", surface: "project-surface-green" },
  { number: "03", title: "Research Database", client: "Agricultural research", type: "Data experience", statement: "Years of valuable research, accessible in seconds.", image: "/researchdb.png", surface: "project-surface-violet" },
]

const mediaMentions = [
  { name: "Winnipeg Sun", logo: "/ws.png", url: "https://winnipegsun.com/news/provincial/manitoban-creates-app-that-detects-products-made-in-canada" },
  { name: "Winnipeg Free Press", logo: "/fp.png.webp", url: "https://www.winnipegfreepress.com/business/2025/02/14/touchscreen-on-pulse-of-buy-canadian-surge" },
  { name: "Brandon Sun", logo: "/bs.png", url: "https://www.brandonsun.com/local/2025/02/15/brandonite-develops-app-to-help-shoppers-buy-canadian" },
  { name: "CBC Radio", logo: "/CBC_logo.svg", url: "https://www.cbc.ca/listen/live-radio/1-101-radio-noon-manitoba/clip/16129218-new-app-canmade-developed-brandon" },
  { name: "CTV News", logo: "/ct.png", url: "https://www.ctvnews.ca/winnipeg/article/manitoba-man-creates-app-to-help-you-shop-for-canadian-products/" },
  { name: "The Western Producer", logo: "/western-producer-logo.jpg", url: "https://www.producer.com/livestock/cattleos-fills-a-record-keeping-tech-gap-for-beef-cattle-producers/" },
]

const fallbackInsights = [
  { slug: "building-software-that-gets-used", title: "How to build software your team will actually use", excerpt: "Why adoption is the clearest measure of a successful digital product.", date: "2026-05-14" },
  { slug: "ai-beyond-the-hype", title: "AI beyond the hype: where automation creates value", excerpt: "A practical framework for finding valuable, low-risk opportunities inside your operation.", date: "2026-04-22" },
  { slug: "modernizing-without-disruption", title: "Modernizing critical systems without disrupting work", excerpt: "A staged approach to replacing legacy technology while protecting continuity.", date: "2026-03-18" },
]

export default async function Home() {
  const posts = await getRecentBlogPosts(3)
  const insights = posts.length ? posts.map(post => ({
    slug: post.slug,
    title: plainText(post.title.rendered),
    excerpt: plainText(post.excerpt.rendered),
    date: post.date,
  })) : fallbackInsights

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Header />
      <main id="main-content">
        <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black px-5 pb-14 pt-32 text-white md:px-10 md:pb-20">
          <video autoPlay muted loop playsInline preload="metadata" poster="/hero-bg.png" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70">
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.2)_0%,rgba(0,0,0,.15)_35%,rgba(0,0,0,.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(106,146,255,.2),transparent_35%)]" />
          <div className="relative mx-auto w-full max-w-[1500px]">
            <div className="max-w-6xl">
              <p className="mb-6 text-sm font-medium tracking-[-0.01em] text-white/60 md:text-base">Design and engineering for the world&apos;s essential industries</p>
              <h1 className="text-[clamp(4rem,9.6vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.075em]">Complexity,<br /><span className="hero-shine">beautifully resolved.</span></h1>
            </div>
            <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">We design software with the clarity people love and the engineering depth critical operations demand.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="premium-button group bg-white text-black">Start a project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
                <Link href="#work" className="premium-button border border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-black">See our work</Link>
              </div>
            </div>
          </div>
        </section>

        <WebsiteOffer />

        <section className="flex min-h-[100svh] items-center overflow-hidden bg-black px-5 py-20 text-white md:px-10">
          <blockquote
            className="mx-auto w-full max-w-[1700px] font-bold"
            style={{ fontSize: "clamp(5.75rem, 15vw, 17rem)", lineHeight: 0.76, letterSpacing: "-0.085em" }}
          >
            The AI era<br />doesn&apos;t reward<br /><span style={{ color: "rgba(255,255,255,.42)" }}>followers.</span>
          </blockquote>
        </section>

        <section className="bg-white px-5 py-8 md:px-10">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">Trusted in the field and the boardroom</p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 opacity-45 grayscale md:gap-x-14">
              <Image src="/MCA_logo.png" alt="Manitoba Crop Alliance" width={115} height={42} className="h-8 w-auto object-contain" />
              <Image src="/ab_grains.png" alt="Alberta Grains" width={110} height={42} className="h-9 w-auto object-contain" />
              <Image src="/serf_logo.png" alt="South East Research Farm" width={100} height={42} className="h-9 w-auto object-contain" />
              <Image src="/cattleos_logo.png" alt="CattleOS" width={100} height={42} className="h-8 w-auto object-contain" />
              <Image src="/timesule_logo.png" alt="TimeSule" width={100} height={42} className="h-8 w-auto object-contain" />
            </div>
          </div>
        </section>

        <section id="services" className="overflow-hidden bg-[#f5f5f7] px-5 py-28 md:px-10 md:py-48">
          <div className="mx-auto max-w-[1400px] text-center">
            <p className="premium-kicker">Our standard is simple</p>
            <h2 className="mx-auto mt-5 max-w-6xl text-[clamp(3.2rem,7.5vw,7.6rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Powerful enough for your operation. <span className="text-black/25">Simple enough for everyone.</span></h2>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-black/50 md:text-xl">The finest software hides extraordinary complexity behind an experience that feels inevitable.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-black/40">
              {industries.map(industry => <span key={industry}>{industry}</span>)}
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-[1400px] gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, text, href }) => (
              <Link key={title} href={href} className="premium-card group flex min-h-[360px] flex-col text-left">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white"><Icon className="h-5 w-5" strokeWidth={1.5} /></div>
                  <ArrowRight className="h-5 w-5 text-black/25 transition duration-300 group-hover:translate-x-1 group-hover:text-black" />
                </div>
                <div className="mt-auto pt-20"><h3 className="text-3xl font-semibold leading-none tracking-[-0.045em]">{title}</h3><p className="mt-4 text-base leading-relaxed text-black/50">{text}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <section id="work" className="overflow-hidden bg-[#f3f3f1] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-7 border-b border-black/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div><p className="premium-kicker">Selected work</p><h2 className="mt-4 text-[clamp(3.2rem,6vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">Software people<br /><span className="text-black/25">want to use.</span></h2></div>
              <div className="max-w-md"><p className="text-base leading-relaxed text-black/50">Every detail considered. Every interaction intentional. Every system ready for the real world.</p><div className="mt-5 flex flex-wrap gap-2">{platforms.map(({ icon: Icon, title, href }) => <Link key={title} href={href} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs text-black/55 transition hover:border-black/30 hover:text-black"><Icon className="h-3.5 w-3.5" />{title}</Link>)}</div></div>
            </div>

            <article className="grid gap-10 py-14 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-16 lg:py-20">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[.17em] text-black/35">01 / Alberta Grains</p>
                <h3 className="mt-5 text-5xl font-semibold leading-[.96] tracking-[-.055em] md:text-7xl">Alberta<br />Blue Book</h3>
                <p className="mt-6 text-lg font-medium leading-relaxed text-black/75">The trusted field guide, reimagined as one digital agronomy ecosystem.</p>
                <p className="mt-5 leading-relaxed text-black/50">We transformed a cornerstone agricultural resource into a fast, searchable product for producers and agronomists—available on the web and in the field.</p>
                <ul className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-black/55"><li className="rounded-full border border-black/10 bg-white px-3 py-2">Product design</li><li className="rounded-full border border-black/10 bg-white px-3 py-2">Web platform</li><li className="rounded-full border border-black/10 bg-white px-3 py-2">Mobile app</li></ul>
                <Link href="/contact" className="group mt-8 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold">Build something this useful <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              </div>

              <div className="bluebook-showcase">
                <div className="bluebook-orb" />
                <div className="bluebook-laptop">
                  <div className="bluebook-screen"><Image src="/bluebook-tablet.png" alt="Alberta Blue Book web platform" fill sizes="(max-width: 1024px) 90vw, 58vw" className="object-cover object-top" /></div>
                  <div className="bluebook-base" />
                </div>
                <div className="bluebook-phone"><div className="bluebook-phone-speaker" /><div className="relative h-full w-full overflow-hidden rounded-[1.45rem]"><Image src="/screen2.jpg" alt="Alberta Blue Book mobile application" fill sizes="220px" className="object-cover object-top" /></div></div>
              </div>
            </article>

            <div className="grid gap-5 border-t border-black/10 pt-10 md:grid-cols-2">
              {projects.map(project => <article key={project.title} className="group grid overflow-hidden rounded-[1.75rem] border border-black/[.06] bg-white sm:grid-cols-[1fr_.9fr]">
                <div className="flex flex-col p-7 md:p-9"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/30">{project.number} / {project.type}</p><h3 className="mt-5 text-3xl font-semibold tracking-[-.045em]">{project.title}</h3><p className="mt-3 leading-relaxed text-black/45">{project.statement}</p><p className="mt-auto pt-8 text-sm font-medium text-black/40">{project.client}</p></div>
                <div className={`relative flex min-h-64 items-center overflow-hidden p-5 ${project.surface}`}><div className="project-glow" /><div className="relative z-10 aspect-[1.95/1] w-full overflow-hidden rounded-xl bg-white shadow-[0_18px_35px_rgba(0,0,0,.18)]"><Image src={project.image} alt={`${project.title} interface`} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-contain transition duration-700 group-hover:scale-[1.025]" /></div></div>
              </article>)}
            </div>
          </div>
        </section>

        <section id="approach" className="bg-white px-5 py-28 md:px-10 md:py-48">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
              <div className="lg:sticky lg:top-32"><p className="premium-kicker">How we work</p><h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.96] tracking-[-0.06em] md:text-7xl">One focused team.<br /><span className="text-black/25">Zero lost translation.</span></h2><p className="mt-8 max-w-xl text-lg leading-relaxed text-black/50">You work directly with the people imagining, designing, and engineering your product. Ideas move faster. Decisions get sharper. Quality stays uncompromised.</p></div>
              <div className="divide-y divide-black/10 border-y border-black/10">
                {["Understand the operation", "Design the experience", "Engineer the system", "Evolve the product"].map((step, index) => <div key={step} className="group flex min-h-36 items-center gap-6 py-8"><span className="text-sm text-black/30">0{index + 1}</span><h3 className="text-2xl font-semibold tracking-[-0.035em] md:text-3xl">{step}</h3><ArrowRight className="ml-auto h-5 w-5 text-black/20 transition group-hover:translate-x-1 group-hover:text-black" /></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="insights" className="bg-[#f5f5f7] px-5 py-28 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between"><div><p className="premium-kicker">Ideas from Bytesavy</p><h2 className="mt-4 text-5xl font-semibold tracking-[-0.055em] md:text-7xl">Think deeper.</h2></div><Link href="/blog" className="hidden items-center gap-2 font-semibold md:flex">All insights <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">{insights.map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={`insight-card group ${index === 0 ? "md:col-span-2" : ""}`}><p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">Insight / {new Date(post.date).getFullYear()}</p><h3 className={`${index === 0 ? "md:text-5xl" : "md:text-3xl"} mt-16 text-3xl font-semibold leading-[1.04] tracking-[-0.045em]`}>{post.title}</h3><p className="mt-5 line-clamp-3 max-w-xl leading-relaxed text-black/45">{post.excerpt}</p><span className="mt-auto flex h-11 w-11 items-center justify-center self-end rounded-full bg-black text-white transition group-hover:scale-110"><ArrowRight className="h-4 w-4" /></span></Link>)}</div>
            <Link href="/blog" className="mt-8 inline-flex items-center gap-2 font-semibold md:hidden">All insights <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1400px]"><p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/30">Featured in</p><div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">{mediaMentions.map(item => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="group flex h-12 items-center justify-center"><span className="relative block h-9 w-28 opacity-35 grayscale transition group-hover:opacity-80"><Image src={item.logo} alt={item.name} fill sizes="112px" className="object-contain" /></span></a>)}</div></div>
        </section>

        <section className="relative overflow-hidden bg-black px-5 py-32 text-center text-white md:px-10 md:py-52">
          <div className="cta-orb absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative mx-auto max-w-6xl"><p className="premium-kicker text-white/45">Your next advantage</p><h2 className="mt-6 text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.88] tracking-[-0.075em]">Make it<br /><span className="hero-shine">unforgettable.</span></h2><p className="mx-auto mt-9 max-w-xl text-lg text-white/50">Bring us the complexity. We will create the clarity.</p><Link href="/contact" className="premium-button group mt-10 bg-white text-black">Start a conversation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
