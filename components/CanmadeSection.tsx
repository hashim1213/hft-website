import { motion } from "framer-motion"
import { Scan, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const CanMadeSection = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp} className="flex justify-center items-center">
            <div className="relative w-48 h-48">
              <Image
                src="/app-logo.png"
                alt="CanMade App Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded-full">
              <Scan className="w-4 h-4 mr-2" />
              <span>Introducing CanMade</span>
            </div>

            <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
              Discover and Support
              <span className="block text-red-600">Canadian Products</span>
            </h2>

            <p className="text-lg text-gray-600">
              Our innovative app helps you easily identify and purchase Canadian-made food products. 
              With just a quick scan, verify product origins and support local businesses across the country.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/canmade" passHref>
                  <Button
                    size="lg"
                    className="group bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <a 
                  href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group hover:bg-gray-100 text-gray-900 w-full sm:w-auto"
                  >
                    Download for iOS
                    <ShoppingBag className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              <p className="text-sm text-gray-500">Android Version Coming Soon</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-900">Smart Scanner</h4>
                <p className="text-gray-600">Instantly verify product origins with our advanced recognition technology</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-900">Growing Database</h4>
                <p className="text-gray-600">Access our extensive collection of verified Canadian products</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CanMadeSection