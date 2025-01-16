'use client'
import { useEffect, useState, use } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

const initializeFirebase = () => {
  if (typeof window === 'undefined') return null;

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }

  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  readTime: string
  status: 'draft' | 'published'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Unwrap the params promise using React.use
  const resolvedParams = use(params)

  useEffect(() => {
    const app = initializeFirebase()
    if (!app) return;

    const db = getFirestore(app)
    
    async function loadPost() {
      try {
        const docRef = doc(db, 'posts', resolvedParams.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const timestamp = data.createdAt?.toDate?.() || new Date()
          setPost({
            id: docSnap.id,
            ...data,
            createdAt: timestamp.toISOString()
          } as BlogPost)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        console.error('Error loading post:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 mt-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-64" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 mt-8">
          <Alert variant="destructive" className="max-w-3xl mx-auto">
            <AlertDescription>{error || 'Post not found'}</AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    )
  }


  const formattedDate = formatDate(post.createdAt)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <header className="mb-12">
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Icons.User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Calendar className="h-4 w-4" />
                  <time dateTime={post.createdAt}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').filter(Boolean).map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Share this post</h2>
              <div className="flex gap-4">
                {typeof window !== 'undefined' && (
                  <>
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Icons.Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Icons.Linkedin className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Icons.Link className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  )
}