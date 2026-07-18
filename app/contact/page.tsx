'use client'

import { useState, type ChangeEvent, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { ArrowRight, Check, LoaderCircle, Mail, MapPin, Phone } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  name: string
  company: string
  email: string
  projectType: string
  message: string
}

const initialFormData: FormData = { name: "", company: "", email: "", projectType: "", message: "" }

const expectations = [
  { title: "A thoughtful first response", text: "We review every note personally and usually respond within one business day." },
  { title: "A conversation, not a pitch", text: "We start by understanding the operation, the opportunity, and what a useful outcome looks like." },
  { title: "Clear next steps", text: "If we are a strong fit, we will recommend a practical path forward with no unnecessary complexity." },
]

const inputClass = "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-base text-black outline-none transition placeholder:text-black/25 focus:border-black focus:ring-1 focus:ring-black"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID || "",
        {
          from_name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          project_type: formData.projectType,
          message: formData.message,
          to_name: "Admin",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      )

      if (result.status !== 200) throw new Error("Failed to send message")
      setSuccess(true)
      setFormData(initialFormData)
    } catch (err) {
      console.error("Contact form error:", err)
      setError("We couldn’t send your message. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-black px-5 pb-10 pt-28 text-white md:px-10 md:pb-12 md:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(112,140,255,.25),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-[1400px] gap-5 md:grid-cols-[1fr_.8fr] md:items-end">
            <div>
              <p className="premium-kicker text-white/45">Start a conversation</p>
              <h1 className="mt-3 text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[.92] tracking-[-.065em]">Let’s talk.</h1>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/55 md:justify-self-end md:text-lg">Tell us what you want to change, build, or understand. You do not need a perfect brief—just a useful place to begin.</p>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <aside className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
              <p className="premium-kicker">What happens next</p>
              <h2 className="mt-5 text-5xl font-semibold leading-[.96] tracking-[-.055em] md:text-6xl">A simple start to <span className="text-black/25">important work.</span></h2>
              <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
                {expectations.map((item, index) => <div key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-3 py-6"><span className="text-xs font-semibold text-black/25">0{index + 1}</span><div><h3 className="font-semibold tracking-[-.02em]">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-black/50">{item.text}</p></div></div>)}
              </div>
              <div className="mt-9 space-y-4 text-sm text-black/55">
                <a href="mailto:sales@bytesavy.com" className="flex items-center gap-3 transition hover:text-black"><Mail className="h-4 w-4" />sales@bytesavy.com</a>
                <a href="tel:+12045969355" className="flex items-center gap-3 transition hover:text-black"><Phone className="h-4 w-4" />+1 (204) 596-9355</a>
                <p className="flex items-center gap-3"><MapPin className="h-4 w-4" />Brandon, Manitoba · Working worldwide</p>
              </div>
            </aside>

            <div className="order-1 rounded-[2rem] border border-black/[.06] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,.05)] md:p-9 lg:order-2 lg:p-10">
              <div className="mb-9"><p className="premium-kicker">Project inquiry</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] md:text-4xl">Tell us a little about your project.</h2></div>

              <div aria-live="polite">
                {error && <div role="alert" className="mb-7 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
                {success && <div className="mb-7 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"><Check className="mt-0.5 h-4 w-4 shrink-0" /><span>Thank you. Your message is on its way, and we’ll be in touch soon.</span></div>}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div><label htmlFor="name" className="mb-2 block text-sm font-semibold">Name <span className="text-black/35">*</span></label><input id="name" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="Your name" autoComplete="name" required /></div>
                  <div><label htmlFor="company" className="mb-2 block text-sm font-semibold">Company <span className="font-normal text-black/35">Optional</span></label><input id="company" name="company" value={formData.company} onChange={handleInputChange} className={inputClass} placeholder="Organization name" autoComplete="organization" /></div>
                </div>
                <div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Work email <span className="text-black/35">*</span></label><input id="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="you@company.com" type="email" autoComplete="email" required /></div>
                <div><label htmlFor="projectType" className="mb-2 block text-sm font-semibold">How can we help? <span className="text-black/35">*</span></label><select id="projectType" name="projectType" value={formData.projectType} onChange={handleInputChange} className={`${inputClass} appearance-none`} required><option value="" disabled>Select a capability</option><option value="product-design">Product design</option><option value="web">Web application</option><option value="mobile">Mobile app</option><option value="software-engineering">Software engineering</option><option value="ai">Applied AI</option><option value="consulting">Technology consulting</option><option value="other">Something else</option></select></div>
                <div><label htmlFor="message" className="mb-2 block text-sm font-semibold">What are you hoping to accomplish? <span className="text-black/35">*</span></label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className={`${inputClass} min-h-40 resize-y`} placeholder="Share the challenge, context, timeline, or anything else that would help us understand the opportunity." required /></div>
                <div className="flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-relaxed text-black/40">By submitting this form, you agree that we may contact you about your inquiry.</p><button type="submit" disabled={loading} className="premium-button group bg-black text-white disabled:cursor-not-allowed disabled:opacity-50">{loading ? <><LoaderCircle className="h-4 w-4 animate-spin" />Sending</> : <>Send inquiry <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>}</button></div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
