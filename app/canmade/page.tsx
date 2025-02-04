'use client'

import React from 'react';
import { Scan, ShoppingBag, Heart, Building, Database, Mail } from 'lucide-react';
import { FeatureCard} from '@/components/featurecard'
import { BenefitCard } from '@/components/benefitcard'
import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-red-600 text-white p-4">
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
          <div className="space-x-6">
            <a href="#features" className="hover:text-red-200">Features</a>
            <a href="#why" className="hover:text-red-200">Why Choose Us</a>
            <a href="#collaborate" className="hover:text-red-200">Collaborate</a>
            <a href="/canmade/privacy" className="hover:text-red-200">Privacy Policy</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-600 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Discover Canadian Products</h1>
            <p className="text-xl mb-8">Scan barcodes to instantly verify if products are made in Canada</p>
            <div className="space-y-4">
              <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition-colors">
                Download Now
              </button>
              <p className="text-sm font-medium text-white/90">Coming Soon to Android</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Scan className="w-12 h-12 text-red-600" />}
              title="Barcode Scanner"
              description="Quickly scan product barcodes to check if they&apos;re Canadian made"
            />
            <FeatureCard 
              icon={<ShoppingBag className="w-12 h-12 text-red-600" />}
              title="Product Details"
              description="View detailed information about products, including their origin"
            />
            <FeatureCard 
              icon={<Database className="w-12 h-12 text-red-600" />}
              title="Extensive Database"
              description="Powered by Open Food Facts API for reliable product information"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CanMade?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<Building className="w-12 h-12 text-red-600" />}
              title="Support Canadian Businesses"
              description="Your purchases help local companies thrive and strengthen our economy"
            />
            <BenefitCard
              icon={<Heart className="w-12 h-12 text-red-600" />}
              title="Community-Driven"
              description="Join us in building a database that benefits all Canadians"
            />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaborate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Help Build Our Database</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're actively working on building Canada's most comprehensive database of locally made products. 
              This is a community effort, and we need your help!
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Partner With Us</h3>
            <p className="text-gray-600 mb-6">
              Are you a Canadian manufacturer or retailer? We'd love to collaborate with you to ensure our database 
              accurately represents your products. Together, we can help Canadians make informed choices about 
              buying local.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <Mail className="w-6 h-6" />
              <a href="mailto:hello@bytesavy.com" className="hover:text-red-700 font-medium">
                hello@bytesavy.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-xl mb-8">Start supporting Canadian businesses—one scan at a time!</p>
          <div className="space-y-4">
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
              Download CanMade
            </button>
            <p className="text-sm text-gray-600">Coming Soon to Android</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
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
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#why" className="text-gray-400 hover:text-white">Why Choose Us</a></li>
                <li><a href="#collaborate" className="text-gray-400 hover:text-white">Collaborate</a></li>
                <li><a href="/canmade/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Want to help build our database?</p>
              <a href="mailto:hello@bytesavy.com" className="text-gray-400 hover:text-white">
                hello@bytesavy.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;