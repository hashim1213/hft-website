'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
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

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
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

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* ByteSavy Logo in Top Left */}
      <div className="absolute top-6 left-6">
        <img 
          src="/logo_white.png" 
          alt="ByteSavy Logo" 
          className="h-12 w-auto"
        />
      </div>
      
      <div className="max-w-5xl w-full flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left side - Image Area */}
        <div className="hidden md:block md:w-2/5 relative h-[480px]">
          <img 
            src="/Unknown-2.jpg" 
            alt="Content management" 
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-base font-semibold">Content Management</h2>
            <p className="text-xs opacity-70">Manage your posts</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-3/5 bg-black p-8 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-1 text-center">Sign in</h1>
            <p className="text-gray-400 text-sm mb-6 text-center">to continue to Content Management</p>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-900/20 border border-red-800 text-red-300">
                <Icons.AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-md"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-md mt-1"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Need help? Contact your administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}