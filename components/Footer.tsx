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
    { name: 'GitHub', href: 'https://github.com/hft', icon: Icons.Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/hft', icon: Icons.Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/hft', icon: Icons.Twitter }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <div className="relative h-12 w-36">
              <Image
                src="/logo2.png"
                alt="Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
          <p className="max-w-2xl mx-auto text-gray-400 mb-8">
            We blend creativity with cutting-edge technology to build transformative digital solutions. 
            Our AI-powered approach delivers results that drive your business forward.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {FOOTER_LINKS.social.map((link) => {
              const Icon = link.icon
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-white transition-colors transform hover:scale-110 duration-200"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white text-center">Solutions</h4>
            <ul className="space-y-3 text-center">
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
            <h4 className="text-lg font-semibold text-white text-center">Services</h4>
            <ul className="space-y-3 text-center">
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
            <h4 className="text-lg font-semibold text-white text-center">Company</h4>
            <ul className="space-y-3 text-center">
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
            <h4 className="text-lg font-semibold text-white text-center">Admin</h4>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full gap-2 bg-white/5 hover:bg-white/10">
                  <Icons.LogIn className="h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-sm">© {new Date().getFullYear()} Bytesavy. All rights reserved.</span>
              <div className="relative h-5 w-7">
                <Image
                  src="/canada-flag.jpeg"
                  alt="Canadian Flag"
                  fill
                  className="object-contain rounded"
                  priority
                />
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-white transition-colors"
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