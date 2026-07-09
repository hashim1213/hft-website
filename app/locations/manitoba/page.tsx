import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingDialog from '@/components/BookingDialog'
import { Card, CardContent } from "@/components/ui/card"
import { CheckmarkRegular } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: 'Software Development Company Manitoba | Custom App Development Winnipeg',
  description: 'Leading software development company in Manitoba. Custom software development, mobile app development, and agricultural software solutions for Winnipeg and across Manitoba. Expert developers serving Manitoba farms and businesses.',
  keywords: [
    'software development Manitoba',
    'software development company Manitoba',
    'app development Manitoba',
    'Winnipeg software development',
    'Manitoba software developers',
    'custom software development Winnipeg',
    'agricultural software Manitoba',
    'app development Winnipeg',
    'Manitoba app developers'
  ],
  openGraph: {
    title: 'Software Development Company Manitoba | Bytesavy',
    description: 'Expert software development services across Manitoba including Winnipeg, Brandon, and rural communities.',
    url: 'https://bytesavy.com/locations/manitoba',
  }
}

export default function ManitobaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold sm:text-5xl text-primary mb-6">
              Software Development Company in Manitoba
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Bytesavy delivers custom software development and mobile app development services across Manitoba. From Winnipeg to rural farming communities, we build practical agricultural software and business applications that modernize operations.
            </p>
            <BookingDialog />
          </div>
        </section>

        {/* Services for Manitoba */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-primary mb-12">Our Manitoba Software Development Services</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Agricultural Software Development",
                  description: "Custom farm management software, crop tracking systems, and precision agriculture solutions built specifically for Manitoba's agricultural sector.",
                  features: ["Farm data management", "Crop monitoring apps", "Weather integration", "Equipment tracking"]
                },
                {
                  title: "Custom Business Software",
                  description: "Tailored software solutions for Manitoba businesses including inventory management, CRM systems, and operational tools.",
                  features: ["Web applications", "Cloud platforms", "Database systems", "API integrations"]
                },
                {
                  title: "Mobile App Development",
                  description: "iOS and Android mobile applications for field operations, data collection, and business management across Manitoba.",
                  features: ["Native iOS apps", "Android applications", "Offline functionality", "Real-time sync"]
                },
                {
                  title: "Legacy System Modernization",
                  description: "Update outdated software systems with modern, cloud-based solutions that improve efficiency and accessibility.",
                  features: ["Cloud migration", "System upgrades", "Data migration", "Training & support"]
                }
              ].map((service, index) => (
                <Card key={index} className="border border-accent shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckmarkRegular className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Manitoba-specific Content */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Bytesavy for Manitoba Software Development?</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Agricultural Expertise",
                      description: "Deep understanding of Manitoba's agricultural sector and the unique software needs of farming operations."
                    },
                    {
                      title: "Local Knowledge",
                      description: "Familiar with Manitoba business environment, regulations, and operational challenges."
                    },
                    {
                      title: "Proven Track Record",
                      description: "Trusted by Manitoba agricultural organizations including Manitoba Crop Alliance and local farms."
                    },
                    {
                      title: "Canadian Made",
                      description: "Proudly Canadian software development with data stored in Canada and full compliance with Canadian privacy laws."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckmarkRegular className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Serving All of Manitoba</h2>
                <p className="text-gray-600 mb-6">
                  We provide software development services to businesses and agricultural operations across Manitoba, including:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Winnipeg", "Brandon", "Steinbach", "Portage la Prairie",
                    "Winkler", "Selkirk", "Morden", "Dauphin",
                    "Thompson", "The Pas", "Flin Flon", "Rural Manitoba"
                  ].map((city, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckmarkRegular className="w-4 h-4 text-accent" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white rounded-lg border border-accent">
                  <h3 className="font-semibold text-primary mb-3">Popular Search Terms:</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Software development Manitoba • App development Winnipeg • Custom software Winnipeg •
                    Software developers Manitoba • Agricultural software Manitoba • Mobile app development Manitoba •
                    Software companies Winnipeg • Web development Manitoba
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-accent text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Modernize Your Manitoba Operation?</h2>
            <p className="text-lg text-white/90 mb-8">
              Let's discuss how custom software can transform your agricultural business or organization in Manitoba.
            </p>
            <BookingDialog />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
