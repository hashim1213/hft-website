'use client'

import React from 'react';
import { ScanDashRegular, ShoppingBagRegular, HeartRegular, BuildingRegular, DatabaseRegular, MailRegular, TrophyRegular, ArrowRightRegular, ClockRegular, GlobeRegular, VideoRegular } from '@fluentui/react-icons';
import { FeatureCard } from '@/components/featurecard';
import { BenefitCard } from '@/components/benefitcard';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-red-600 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/app-logo.png"
              alt="CanMade Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="text-2xl font-bold">CanMade</div>
          </div>

          <a
            href="https://buymeacoffee.com/canmadeapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors"
          >
            <HeartRegular className="mr-2 w-4 h-4" />
            <span>Donate</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-600 to-red-500 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Canadian Products</h1>
              <p className="text-xl mb-8">Scan barcodes to instantly verify if products are made in Canada. Join thousands of Canadians supporting local businesses.</p>
              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition-colors"
                >
                  <span>Download for iOS</span>
                  <ArrowRightRegular className="ml-2 w-4 h-4" />
                </a>
                <p className="text-sm font-medium text-white/90">Coming Soon to Android</p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/4.png"
                  alt="CanMade App Screenshot 1"
                  width={240}
                  height={480}
                  className="rounded-xl transform rotate-6"
                />
                <Image
                  src="/5.png"
                  alt="CanMade App Screenshot 2"
                  width={240}
                  height={480}
                  className="rounded-xl transform -rotate-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* As Seen On Section */}
      <section id="media" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <VideoRegular className="w-16 h-16 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6">As Seen On</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CanMade has been featured on national news. Watch our interviews with CBC and CTV.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/mxB6XiBbn3A"
                  title="Brandon man creates app to help Canadians find local products"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">CBC News Manitoba</h3>
              <p className="text-gray-600">Brandon man creates app to help Canadians find local products</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/GIR_YikgvkY?start=183"
                  title="The app helping people shop Canadian-made"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">CTV News</h3>
              <p className="text-gray-600">The app helping people shop Canadian-made</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ScanDashRegular className="w-12 h-12 text-red-600" />}
              title="Smart Barcode Scanner"
              description="Instantly scan and verify product origins with our advanced recognition technology"
            />
            <FeatureCard 
              icon={<ShoppingBagRegular className="w-12 h-12 text-red-600" />}
              title="Detailed Product Info"
              description="Access comprehensive product details, manufacturing location, and Canadian certification"
            />
            <FeatureCard 
              icon={<DatabaseRegular className="w-12 h-12 text-red-600" />}
              title="Growing Database"
              description="Access our extensive database of Canadian products, updated daily by our community"
            />
            <FeatureCard 
              icon={<ClockRegular className="w-12 h-12 text-red-600" />}
              title="Real-time Updates"
              description="Stay informed with the latest additions to our Canadian product database"
            />
            <FeatureCard 
              icon={<GlobeRegular className="w-12 h-12 text-red-600" />}
              title="National Coverage"
              description="Find Canadian-made products across all provinces and territories"
            />
            <FeatureCard 
              icon={<TrophyRegular className="w-12 h-12 text-red-600" />}
              title="Open Source Information"
              description="We are currently using an open-source API and are developing our own"
            />
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section id="why" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CanMade?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<BuildingRegular className="w-12 h-12 text-red-600" />}
              title="Empower Local Economy"
              description="Every scan and purchase through CanMade directly supports Canadian businesses and strengthens our local economy"
            />
            <BenefitCard
              icon={<HeartRegular className="w-12 h-12 text-red-600" />}
              title="Community-Driven Platform"
              description="Join thousands of Canadians contributing to and benefiting from our growing database of local products"
            />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaborate" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in building Canada&apos;s most comprehensive database of locally made products. 
              Whether you&apos;re a manufacturer, retailer, or media outlet, we&apos;d love to collaborate!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Manufacturers</h3>
              <p className="text-gray-600 mb-6">
                Verify your products&apos; Canadian origin and reach conscious consumers directly. 
                Get detailed insights about your product visibility and consumer engagement.
              </p>
              <div className="flex items-center space-x-2 text-red-600">
                <MailRegular className="w-6 h-6" />
                <a href="mailto:hello@bytesavy.com" className="hover:text-red-700 font-medium">
                  Contact Our Team
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Media</h3>
              <p className="text-gray-600 mb-6">
                Get the latest statistics, success stories, and insights about Canadian manufacturing 
                and consumer behavior. Access our press kit and request interview opportunities.
              </p>
              <div className="flex items-center space-x-2 text-red-600">
                <MailRegular className="w-6 h-6" />
                <a href="mailto:press@bytesavy.com" className="hover:text-red-700 font-medium">
                  Press Inquiries
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-red-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start Supporting Canadian Businesses Today</h2>
          <p className="text-xl mb-8">Join thousands of Canadians making informed shopping decisions</p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition-colors"
              >
                <span>Download for iOS</span>
                <ArrowRightRegular className="ml-2 w-4 h-4" />
              </a>
              <a
                href="https://buymeacoffee.com/canmadeapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                <HeartRegular className="mr-2 w-4 h-4" />
                <span>Support the App</span>
              </a>
            </div>
            <p className="text-sm text-white/90">Android Version Coming Soon</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <Image 
                src="/app-logo.png"
                alt="CanMade Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <h3 className="text-xl font-bold">CanMade</h3>
                <p className="text-gray-400">Supporting Canadian businesses</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#media" className="text-gray-400 hover:text-white">As Seen On</a></li>
                <li><a href="#why" className="text-gray-400 hover:text-white">Why Choose Us</a></li>
                <li><a href="#collaborate" className="text-gray-400 hover:text-white">Collaborate</a></li>
                <li><a href="https://buymeacoffee.com/canmadeapp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Buy Me a Coffee</a></li>
                <li><a href="/canmade/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <a href="mailto:hello@bytesavy.com" className="hover:text-white">
                    hello@bytesavy.com
                  </a>
                </li>
                <li className="text-gray-400">
                  <a href="mailto:press@bytesavy.com" className="hover:text-white">
                    press@bytesavy.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Download</h3>
              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm"
                >
                  Download for iOS
                </a>
                <p className="text-sm text-gray-400">Android Version Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} CanMade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;