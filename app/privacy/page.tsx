'use client'
import { motion } from "framer-motion"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Tabs defaultValue="privacy" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:max-w-[400px] mx-auto">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy">
              <Card className="border-none shadow-lg">
                <CardContent className="space-y-8 pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8">
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Information Collection and Use</h2>
                        <p>At Bytesavy Technologies, we collect information to provide and improve our services. The types of information we collect include:</p>
                        <div className="pl-4">
                          <p className="mb-2">Personal Information: Name, email address, and contact details provided when using our services or contacting us.</p>
                          <p className="mb-2">Usage Data: Information about how you use our website and services, including browser type, device information, and IP address.</p>
                          <p>Communication Data: Records of your interactions with us, including emails and form submissions.</p>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Use of Information</h2>
                        <p>We use the collected information for:</p>
                        <div className="pl-4">
                          <p className="mb-2">Service Provision: To provide and maintain our services.</p>
                          <p className="mb-2">Communication: To respond to inquiries and send service-related communications.</p>
                          <p className="mb-2">Improvement: To understand how our services are used and make improvements.</p>
                          <p>Legal Compliance: To comply with applicable laws and regulations.</p>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Data Protection</h2>
                        <p>We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Your Rights</h2>
                        <p>You have the right to:</p>
                        <div className="pl-4">
                          <p className="mb-2">Access your personal information</p>
                          <p className="mb-2">Request correction of inaccurate data</p>
                          <p className="mb-2">Request deletion of your data</p>
                          <p>Opt-out of marketing communications</p>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms">
              <Card className="border-none shadow-lg">
                <CardContent className="space-y-8 pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                    <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-8">
                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Agreement to Terms</h2>
                        <p>By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not access our services.</p>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Use License</h2>
                        <p>Permission is granted to temporarily access our services for personal, non-commercial use. This license does not include:</p>
                        <div className="pl-4">
                          <p className="mb-2">Modifying or copying our materials</p>
                          <p className="mb-2">Using materials for commercial purposes</p>
                          <p className="mb-2">Attempting to decompile or reverse engineer any software</p>
                          <p>Removing any copyright or proprietary notations</p>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Service Provision</h2>
                        <p>We provide our services on an &quot;as is&quot; and &quot;as available&quot; basis. We reserve the right to:</p>
                        <div className="pl-4">
                          <p className="mb-2">Modify or discontinue services without notice</p>
                          <p className="mb-2">Refuse service to anyone for any reason</p>
                          <p>Update prices and services without notice</p>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Limitation of Liability</h2>
                        <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. This includes, but is not limited to, loss of data, profits, or business opportunities.</p>
                      </section>

                      <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Governing Law</h2>
                        <p>These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
                      </section>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <center>
        
      <Footer />
      </center>
    </div>
  )
}