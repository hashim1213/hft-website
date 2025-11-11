'use client'
import Link from "next/link"
import Image from "next/image"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"

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
    { name: 'Blog', href: '/portal' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/privacy' }
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/bytesavy', icon: Icons.Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/bytesavy', icon: Icons.Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/bytesavy', icon: Icons.Twitter }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
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
                    className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
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
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-flex items-center gap-2"
                >
                  <Icons.LogIn className="h-4 w-4" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} Bytesavy. All rights reserved.
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Made in</span>
                <div className="relative h-4 w-6">
                  <Image
                    src="/canada-flag.jpeg"
                    alt="Canada"
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">Canada</span>
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