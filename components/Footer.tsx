'use client'
import Link from "next/link"
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
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/privacy' }
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/hft', icon: Icons.Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/hft', icon: Icons.Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/hft', icon: Icons.Twitter }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Solutions</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              {FOOTER_LINKS.social.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
            <div className="pt-4">
              <Link href="/login" className="block w-full">
                <Button variant="outline" className="w-full gap-2 bg-white/5 hover:bg-white/10">
                  <Icons.LogIn className="h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <span className="font-bold text-xl text-white"></span>
              </Link>
              <span className="text-sm">© {new Date().getFullYear()} Bytesavy. All rights reserved.</span>
            </div>
            <div className="flex space-x-4 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
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
