import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingDialog from '@/components/BookingDialog'
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: 'Software Development Company Alberta | App Development Calgary & Edmonton',
  description: 'Leading software development company in Alberta. Custom software development, mobile app development, and agricultural software solutions for Calgary, Edmonton, and across Alberta. Expert developers serving Alberta farms and businesses.',
  keywords: [
    'software development Alberta',
    'software development company Alberta',
    'app development Alberta',
    'Calgary software development',
    'Edmonton software development',
    'Alberta software developers',
    'custom software development Calgary',
    'agricultural software Alberta',
    'app development Calgary',
    'Alberta app developers'
  ],
  openGraph: {
    title: 'Software Development Company Alberta | Bytesavy',
    description: 'Expert software development services across Alberta including Calgary, Edmonton, and rural communities.',
    url: 'https://bytesavy.com/locations/alberta',
  }
}

export default function AlbertaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold sm:text-5xl text-primary mb-6">
              Software Development Company in Alberta
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Bytesavy provides custom software development and mobile app development services across Alberta. From Calgary to Edmonton to rural farming communities, we build practical agricultural software and business applications that drive efficiency.
            </p>
            <BookingDialog />
          </div>
        </section>

        {/* Services for Alberta */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-primary mb-12">Our Alberta Software Development Services</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Agricultural Software Development",
                  description: "Custom farm management software, livestock tracking systems, and precision agriculture solutions built for Alberta's diverse agricultural sector.",
                  features: ["Farm data management", "Livestock tracking", "Grain management", "Equipment monitoring"]
                },
                {
                  title: "Custom Business Software",
                  description: "Tailored software solutions for Alberta businesses including inventory management, CRM systems, and operational tools.",
                  features: ["Web applications", "Cloud platforms", "Database systems", "API integrations"]
                },
                {
                  title: "Mobile App Development",
                  description: "iOS and Android mobile applications for field operations, data collection, and business management across Alberta.",
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
                          <Check className="h-4 w-4 text-accent flex-shrink-0" />
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

        {/* Alberta-specific Content */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Bytesavy for Alberta Software Development?</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Agricultural Expertise",
                      description: "Deep understanding of Alberta's agricultural sector and the unique software needs of farming and ranching operations."
                    },
                    {
                      title: "Local Knowledge",
                      description: "Familiar with Alberta business environment, regulations, and operational challenges across diverse industries."
                    },
                    {
                      title: "Proven Track Record",
                      description: "Trusted by Alberta agricultural organizations including Alberta Grains and local farms."
                    },
                    {
                      title: "Canadian Made",
                      description: "Proudly Canadian software development with data stored in Canada and full compliance with Canadian privacy laws."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <Check className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Serving All of Alberta</h2>
                <p className="text-gray-600 mb-6">
                  We provide software development services to businesses and agricultural operations across Alberta, including:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Calgary", "Edmonton", "Red Deer", "Lethbridge",
                    "Medicine Hat", "Grande Prairie", "Airdrie", "Fort McMurray",
                    "Okotoks", "Camrose", "Brooks", "Rural Alberta"
                  ].map((city, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-accent" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white rounded-lg border border-accent">
                  <h3 className="font-semibold text-primary mb-3">Popular Search Terms:</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Software development Alberta • App development Calgary • Custom software Calgary •
                    Software developers Alberta • Agricultural software Alberta • Mobile app development Alberta •
                    Software companies Calgary • Web development Edmonton • App development Edmonton
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-accent text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Modernize Your Alberta Operation?</h2>
            <p className="text-lg text-white/90 mb-8">
              Let's discuss how custom software can transform your agricultural business or organization in Alberta.
            </p>
            <BookingDialog />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
