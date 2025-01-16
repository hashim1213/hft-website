'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithEmailAndPassword,
  Auth
} from 'firebase/auth'

interface FirebaseError extends Error {
  code: string;
  message: string;
}

// Initialize Firebase only on client side
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Initialize Firebase only on client side
    if (typeof window !== 'undefined') {
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      }

      // Initialize Firebase only if it hasn't been initialized
      if (!getApps().length) {
        app = initializeApp(firebaseConfig)
      } else {
        app = getApps()[0]
      }
      auth = getAuth(app)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!auth) {
      setError('Authentication not initialized')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      const firebaseError = err as FirebaseError
      
      switch (firebaseError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password')
          break
        case 'auth/invalid-email':
          setError('Please enter a valid email address')
          break
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later')
          break
        default:
          setError('Failed to sign in. Please try again')
      }
      console.error('Login error:', firebaseError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Administrator Login</h1>
            <p className="text-gray-600 mt-2">
              Sign in to manage your blog posts
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}