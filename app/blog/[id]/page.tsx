'use client'
import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { motion } from 'framer-motion'
import { User, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

// This matches Next.js App Router's expected param format
export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Safely access the ID
  const postId = params?.id

  useEffect(() => {
    if (!postId) {
      setError('Invalid post ID')
      setLoading(false)
      return
    }

    const app = initializeFirebase()
    if (!app) return;

    const db = getFirestore(app)
    
    async function loadPost() {
      try {
        const docRef = doc(db, 'posts', postId)
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
  }, [postId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-64" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all articles
              </Link>
              
              <Alert variant="destructive">
                <AlertDescription className="text-center py-2">{error || 'Post not found'}</AlertDescription>
              </Alert>
              
              <div className="text-center mt-8">
                <Button asChild>
                  <Link href="/blog">
                    View all articles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formattedDate = formatDate(post.createdAt)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-40 pb-20">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <time dateTime={post.createdAt}>{formattedDate}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600">
                {post.content.split('\n').filter(Boolean).map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">Share this article</h2>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5 text-gray-700" />
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-gray-700" />
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        // Optionally add toast notification here
                      }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}