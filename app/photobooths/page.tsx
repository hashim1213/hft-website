'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

const experiences = [
  {
    number: '01',
    title: 'The Signature Booth',
    eyebrow: 'Elevated event photography',
    description:
      'A beautifully lit, open-air portrait experience with an attentive host, refined backdrop, and instant digital delivery. Made for galas, holiday parties, and company celebrations.',
    image: '/photobooths/celebration.jpg',
    imageAlt: 'Guests celebrating together at an upscale evening event',
    details: ['Studio lighting', 'Custom overlays', 'Instant sharing'],
  },
  {
    number: '02',
    title: 'Brand Activations',
    eyebrow: 'Designed around your campaign',
    description:
      'A fully art-directed experience that turns every guest into a brand moment. From custom sets and digital experiences to lead capture and post-event reporting.',
    image: '/photobooths/brand-event.jpg',
    imageAlt: 'Warmly lit tables and decor prepared for an elevated evening event',
    details: ['Bespoke creative', 'Lead capture', 'Engagement reporting'],
  },
  {
    number: '03',
    title: 'Portrait Studio',
    eyebrow: 'Professional photoshoots, on location',
    description:
      'Bring the studio to your office, conference, or off-site. We create consistent, polished headshots and editorial team portraits without interrupting the workday.',
    image: '/photobooths/team-portraits.jpg',
    imageAlt: 'Professional team together in a bright contemporary workplace',
    details: ['Executive headshots', 'Team portraits', 'Retouching included'],
  },
];

const occasions = [
  'Corporate galas',
  'Holiday parties',
  'Conferences',
  'Product launches',
  'Client appreciation',
  'Executive retreats',
  'Awards evenings',
  'Team photoshoots',
];

const standards = [
  {
    title: 'Considered creative',
    text: 'Templates, screens, backdrops, and guest touchpoints are designed to feel like a natural extension of your brand.',
  },
  {
    title: 'Studio-quality output',
    text: 'Professional cameras, flattering lighting, and carefully calibrated edits ensure every image is worth keeping and sharing.',
  },
  {
    title: 'White-glove production',
    text: 'A dedicated lead handles venue coordination, setup, guest flow, and teardown. Your team simply arrives and enjoys the evening.',
  },
  {
    title: 'Enterprise ready',
    text: 'Fully insured operations, consent-led data capture, professional staff, and reporting that works for marketing and procurement.',
  },
];

const process = [
  ['Discover', 'We learn the occasion, audience, venue, and what success should look like.'],
  ['Art direct', 'We develop the visual direction and refine every branded detail with your team.'],
  ['Produce', 'We coordinate the venue, install early, and host the entire experience on site.'],
  ['Deliver', 'Your edited gallery and optional engagement report arrive within 24 hours.'],
];

const faqs = [
  {
    question: 'Can the experience match our brand guidelines?',
    answer:
      'Absolutely. We work from your brand kit and provide creative for approval before production. Photo layouts, welcome screens, sharing pages, backdrops, and physical details can all be tailored to your identity.',
  },
  {
    question: 'Do you offer professional headshots and team photoshoots?',
    answer:
      'Yes. Our mobile portrait studio can be set up at your office, conference, retreat, or event. We can photograph executive headshots, entire teams, candid workplace imagery, and editorial group portraits, with selected retouching included.',
  },
  {
    question: 'Can you work with our venue and event planner?',
    answer:
      'Yes. We handle floor plans, loading requirements, power, timing, and vendor documentation directly with your planner or venue. We carry commercial liability coverage and can provide a certificate of insurance on request.',
  },
  {
    question: 'How much space and time do you need?',
    answer:
      'Most experiences require an 8–10 foot footprint, a nearby standard outlet, and 60–90 minutes for installation. Bespoke sets and 360 experiences may require more; all technical requirements are confirmed well before event day.',
  },
  {
    question: 'When will we receive the images?',
    answer:
      'Guests can receive images instantly during the event. Your complete, organized gallery is delivered within 24 hours, with analytics and consented lead data where included.',
  },
];

const proposalHref =
  'mailto:photobooths@bytesavy.com?subject=Private%20Event%20Proposal&body=Event%20date%3A%0AVenue%3A%0AEstimated%20guest%20count%3A%0ATell%20us%20about%20the%20occasion%3A';

export default function PhotoboothsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f0e8] text-[#171713] selection:bg-[#b5965d] selection:text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#171713]/80 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
          <a href="#top" className="flex items-center gap-3" aria-label="Bytesavy Photobooths home">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d6bd8c]/60">
              <Camera className="h-4 w-4 text-[#d6bd8c]" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-sm font-medium tracking-[0.04em]">BYTESAVY</span>
              <span className="block text-[9px] tracking-[0.28em] text-white/50">PHOTO EXPERIENCES</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 md:flex">
            <a className="transition hover:text-white" href="#experiences">Experiences</a>
            <a className="transition hover:text-white" href="#standard">Our standard</a>
            <a className="transition hover:text-white" href="#process">Process</a>
            <a className="transition hover:text-white" href="#faq">FAQ</a>
            <a className="rounded-full border border-[#d6bd8c]/70 px-5 py-3 text-[#ead6ae] transition hover:bg-[#d6bd8c] hover:text-[#171713]" href={proposalHref}>
              Request a proposal
            </a>
          </div>

          <button className="grid h-10 w-10 place-items-center md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#171713] px-5 py-7 md:hidden">
            <div className="flex flex-col gap-5 text-sm uppercase tracking-[0.15em] text-white/80">
              {['experiences', 'standard', 'process', 'faq'].map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item === 'standard' ? 'Our standard' : item}</a>
              ))}
              <a href={proposalHref} className="mt-2 text-[#d6bd8c]">Request a proposal →</a>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content">
        <header id="top" className="relative min-h-[900px] bg-[#171713] text-white lg:h-screen lg:min-h-[760px]">
          <Image
            src="/photobooths/corporate-gala.jpg"
            alt="Elegant corporate gala with guests and warm event lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171713]/80 via-transparent to-[#171713]/30" />

          <div className="relative mx-auto flex min-h-[900px] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 lg:h-screen lg:min-h-[760px] lg:px-14 lg:pb-14">
            <div className="mb-auto mt-auto max-w-4xl py-20">
              <div className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#ead6ae]">
                <span className="h-px w-10 bg-[#d6bd8c]" /> Toronto · GTA · Beyond
              </div>
              <h1 className="max-w-4xl font-[family-name:var(--font-photobooth-display)] text-[clamp(3.5rem,7.4vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.045em]">
                The room remembers <span className="italic text-[#e0c99d]">how it felt.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base font-light leading-7 text-white/75 md:text-lg">
                Elevated photo experiences and on-location portrait studios for corporate celebrations, brand moments, and remarkable teams.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={proposalHref} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d6bd8c] px-7 py-4 text-sm font-semibold text-[#171713] transition hover:bg-[#ead6ae]">
                  Plan your experience <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#experiences" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#171713]">
                  Explore our work <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-5 border-t border-white/25 pt-6 text-xs text-white/65 sm:grid-cols-3 lg:max-w-3xl">
              <p><span className="mb-1 block text-white">White-glove service</span>From concept through delivery</p>
              <p><span className="mb-1 block text-white">Studio-quality capture</span>Flattering light, polished imagery</p>
              <p><span className="mb-1 block text-white">Made for your brand</span>Every detail considered</p>
            </div>
          </div>
        </header>

        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.8fr] lg:gap-24">
            <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b744a]">Not just a photo booth</p>
            <div>
              <h2 className="font-[family-name:var(--font-photobooth-display)] text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.035em]">
                We create the place everyone <span className="italic text-[#8b744a]">wants to be.</span>
              </h2>
              <div className="mt-10 grid gap-8 border-t border-black/15 pt-8 text-base leading-7 text-black/60 md:grid-cols-2">
                <p>Part portrait studio, part social experience. Our installations invite people in, make them feel at ease, and create imagery that reflects the calibre of your event.</p>
                <p>Whether you’re hosting an intimate leadership dinner or a thousand-person celebration, we make the experience feel effortless, warm, and distinctly yours.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experiences" className="bg-[#1c1c18] px-5 py-20 text-white md:px-10 md:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-14 flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6bd8c]">Our experiences</p>
                <h2 className="font-[family-name:var(--font-photobooth-display)] text-5xl tracking-[-0.04em] md:text-7xl">Made for the moment.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/55">Choose a signature format or let us build something completely bespoke around your event.</p>
            </div>

            <div className="space-y-20 md:space-y-28">
              {experiences.map((experience, index) => (
                <article key={experience.title} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className={`relative overflow-hidden ${index === 2 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                    <Image src={experience.image} alt={experience.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.025]" />
                    <span className="absolute left-5 top-5 rounded-full bg-black/35 px-4 py-2 text-[10px] tracking-[0.2em] backdrop-blur-md">{experience.number}</span>
                  </div>
                  <div className="max-w-lg">
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d6bd8c]">{experience.eyebrow}</p>
                    <h3 className="font-[family-name:var(--font-photobooth-display)] text-4xl tracking-[-0.03em] md:text-6xl">{experience.title}</h3>
                    <p className="mt-6 text-base font-light leading-7 text-white/60">{experience.description}</p>
                    <ul className="mt-8 border-y border-white/15 py-2">
                      {experience.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3 border-b border-white/10 py-3 text-sm last:border-0">
                          <Check className="h-3.5 w-3.5 text-[#d6bd8c]" /> {detail}
                        </li>
                      ))}
                    </ul>
                    <a href={proposalHref} className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e0c99d] hover:text-white">
                      Inquire about this experience <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#b79b68] py-5 text-[#171713]">
          <div className="flex min-w-max items-center gap-8 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em]">
            {[...occasions, ...occasions].map((occasion, index) => (
              <span key={`${occasion}-${index}`} className="flex items-center gap-8"><Sparkles className="h-3.5 w-3.5" />{occasion}</span>
            ))}
          </div>
        </section>

        <section id="standard" className="px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative min-h-[560px] overflow-hidden md:min-h-[720px]">
                <Image src="/photobooths/team-event.jpg" alt="Team collaborating at a polished corporate gathering" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-8 pt-28 text-white md:p-12 md:pt-36">
                  <p className="font-[family-name:var(--font-photobooth-display)] text-3xl leading-tight md:text-5xl">“Refined enough for the brand. Relaxed enough for the guests.”</p>
                </div>
              </div>
              <div className="lg:py-5">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b744a]">The Bytesavy standard</p>
                <h2 className="font-[family-name:var(--font-photobooth-display)] text-5xl leading-[0.98] tracking-[-0.04em] md:text-7xl">Every detail, quietly handled.</h2>
                <div className="mt-12 divide-y divide-black/15 border-y border-black/15">
                  {standards.map((standard, index) => (
                    <div key={standard.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr]">
                      <span className="font-[family-name:var(--font-photobooth-display)] text-xl italic text-[#9a7e4d]">0{index + 1}</span>
                      <div>
                        <h3 className="text-base font-semibold">{standard.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-black/55">{standard.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="border-y border-black/10 bg-[#e7e1d5] px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_2fr] lg:gap-20">
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b744a]">From idea to event</p>
                <h2 className="font-[family-name:var(--font-photobooth-display)] text-5xl tracking-[-0.04em]">A seamless production.</h2>
              </div>
              <div className="grid gap-px bg-black/15 sm:grid-cols-2">
                {process.map(([title, text], index) => (
                  <div key={title} className="bg-[#e7e1d5] p-7 md:p-9">
                    <span className="text-xs text-[#8b744a]">0{index + 1}</span>
                    <h3 className="mt-12 font-[family-name:var(--font-photobooth-display)] text-3xl">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[0.75fr_1.5fr] lg:gap-24">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b744a]">Good to know</p>
              <h2 className="font-[family-name:var(--font-photobooth-display)] text-5xl tracking-[-0.04em]">Before we begin.</h2>
            </div>
            <div className="border-t border-black/20">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="border-b border-black/20">
                    <button onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={isOpen}>
                      <span className="text-base font-medium md:text-lg">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-[#8b744a] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && <p className="max-w-2xl pb-7 pr-8 text-sm leading-7 text-black/55">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="relative bg-[#1a1a16] px-5 py-24 text-center text-white md:px-10 md:py-36">
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-4xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6bd8c]">Your occasion, beautifully captured</p>
            <h2 className="font-[family-name:var(--font-photobooth-display)] text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.045em]">Let’s create something <span className="italic text-[#d6bd8c]">memorable.</span></h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/55">Share your date, venue, and vision. We’ll return with a considered recommendation and transparent proposal within 48 hours.</p>
            <a href={proposalHref} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#d6bd8c] px-8 py-4 text-sm font-semibold text-[#171713] transition hover:bg-[#ead6ae]">
              Request a private proposal <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-6 text-xs text-white/40">or email <a className="border-b border-white/30 text-white/70" href="mailto:photobooths@bytesavy.com">photobooths@bytesavy.com</a></p>
          </div>
        </section>
      </main>

      <footer className="bg-[#11110e] px-5 py-12 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d6bd8c]/60"><Camera className="h-4 w-4 text-[#d6bd8c]" strokeWidth={1.5} /></span>
              <div><p className="text-sm tracking-[0.04em]">BYTESAVY</p><p className="text-[9px] tracking-[0.28em] text-white/40">PHOTO EXPERIENCES</p></div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Toronto & the GTA</span>
              <a className="inline-flex items-center gap-2 hover:text-white" href="mailto:photobooths@bytesavy.com"><Mail className="h-3.5 w-3.5" /> Email us</a>
              <a className="hover:text-white" href="https://instagram.com/bytesavy" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a className="hover:text-white" href="https://linkedin.com/company/bytesavy" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[0.12em] text-white/30 sm:flex-row">
            <p>© {new Date().getFullYear()} Bytesavy Entertainment</p>
            <div className="flex gap-6"><a href="/privacy" className="hover:text-white">Privacy</a><a href="/" className="hover:text-white">Bytesavy Digital</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
