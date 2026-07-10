'use client'
import Link from "next/link"
import Image from "next/image"
// LinkedIn icon - no direct Fluent UI equivalent, using inline SVG component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const FOOTER_LINKS = {
  solutions: [
    { name: 'Web Development', href: '/web' },
    { name: 'Mobile Apps', href: '/mobile' },
    { name: 'AI Integration', href: '/ai' }
  ],
  services: [
    { name: 'Consulting', href: '/consulting' },
    { name: 'Development', href: '/development' },
    { name: 'Support', href: '/support' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/privacy' },
    { name: 'Sitemap', href: '/site-pages' }
  ],
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/98775344/', icon: LinkedInIcon }
  ]
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 relative overflow-hidden">
      {/* Background Icon */}
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] opacity-10 pointer-events-none">
        <Image
          src="/icon2.png"
          alt=""
          fill
          className="object-contain brightness-0 invert"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-10 w-32">
                <Image
                  src="/logo2.png"
                  alt="Bytesavy Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              A custom software studio building transformative digital solutions with cutting-edge technology and AI-powered innovation.
            </p>
            <div className="flex space-x-4">
              {FOOTER_LINKS.social.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-gray-800 hover:bg-accent flex items-center justify-center transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm text-gray-400">
              {t('footer.copyright')}
            </span>
            <div className="flex items-center gap-3">
              <div className="relative h-4 w-6">
                <Image
                  src="/canada-flag.jpeg"
                  alt="Canada"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div className="relative h-4 w-6">
                <Image
                  src="/us-flag.png"
                  alt="United States"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div className="relative h-4 w-6">
                <Image
                  src="/eu-flag.png"
                  alt="European Union"
                  fill
                  className="object-contain rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}