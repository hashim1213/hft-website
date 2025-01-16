'use client'
import { useState } from "react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, addDoc, collection, Timestamp } from 'firebase/firestore'
import emailjs from '@emailjs/browser'

// Move to environment variables
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

interface Service {
  title: string;
  description: string;
  icon: any; // Ideally should be more specific based on your Icons type
}

const SERVICES: Service[] = [
  {
    title: "Software Development",
    description: "Discuss your software development needs",
    icon: Icons.Code
  },
  {
    title: "AI Integration",
    description: "Explore how AI can enhance your software",
    icon: Icons.Brain
  },
  {
    title: "Technical Consultation",
    description: "Get expert guidance on your tech strategy",
    icon: Icons.BarChart
  }
]

const TIME_SLOTS: string[] = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
]

interface FormData {
  service: string;
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  message: string;
}

interface BookingDialogProps {
  onOpenChange: (open: boolean) => void;
}

const initialFormData: FormData = {
  service: "",
  name: "",
  email: "",
  company: "",
  date: "",
  time: "",
  message: ""
}

const BookingDialog: React.FC<BookingDialogProps> = ({ onOpenChange }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service
    }))
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const docRef = await addDoc(collection(db, 'bookingRequests'), {
        ...formData,
        status: 'pending',
        createdAt: Timestamp.now(),
        duration: '30 minutes'
      })

      const emailResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          service: formData.service,
          date: formData.date,
          time: formData.time,
          message: formData.message || 'No additional message',
          booking_id: docRef.id,
          from_name: formData.name
        }
      )

      if (emailResult.status !== 200) {
        throw new Error('Failed to send email notification')
      }

      setStep(4)
    } catch (error) {
      console.error('Booking error:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit booking request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setFormData(initialFormData)
    setError('')
    onOpenChange?.(false)
  }

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) resetAndClose()
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all" size="lg">
          Book Free Consultation
          <Icons.Calendar className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Select Service"}
            {step === 2 && "Your Information"}
            {step === 3 && "Schedule Meeting"}
            {step === 4 && "Booking Confirmed"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="grid gap-4">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.title}
                  className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => handleServiceSelect(service.title)}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <form className="space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setStep(3)
          }}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </div>
            <div className="flex justify-between gap-4">
              <Button variant="outline" type="button" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}

        {/* Step 3: Schedule Meeting */}
        {step === 3 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Select 
                name="time" 
                value={formData.time}
                onValueChange={(value) => handleInputChange({ 
                  target: { name: 'time', value } 
                } as React.ChangeEvent<HTMLInputElement>)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                placeholder="Any specific topics you&apos;d like to discuss?"
              />
            </div>
            <div className="flex justify-between gap-4">
              <Button variant="outline" type="button" onClick={() => setStep(2)} disabled={loading}>
                Back
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Book Consultation'
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Icons.Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Booking Request Received!</h3>
              <p className="text-gray-600">
                Thank you for your booking request. We&apos;ll review your preferred time and send a confirmation email to {formData.email} within 24 hours. The confirmation email will include the final meeting time and further details.
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Note: Your consultation will be confirmed once you receive our email confirmation.
              </p>
            </div>
            <Button onClick={resetAndClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BookingDialog;