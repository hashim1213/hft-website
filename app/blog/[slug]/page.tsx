'use client'
import { useEffect, useState, use } from 'react'
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { motion } from 'framer-motion'
import { User, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  readTime: string
  status: 'draft' | 'published'
  tags?: string[]
  imageUrl?: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Note: This component expects the route to be [slug] instead of [id]
// File should be located at: app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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
        // Query by slug instead of document ID
        const postsQuery = query(
          collection(db, 'posts'),
          where('slug', '==', resolvedParams.slug),
          where('status', '==', 'published'),
          limit(1)
        )
        
        const querySnapshot = await getDocs(postsQuery)

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0]
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
  }, [resolvedParams.slug])

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
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-64" />
              <Skeleton className="h-24" />
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
              <Link href="/portal" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all articles
              </Link>
              
              <Alert variant="destructive">
                <AlertDescription className="text-center py-2">
                  {error || 'Blog post not found'}
                </AlertDescription>
              </Alert>
              
              <div className="text-center mt-8">
                <Button asChild>
                  <Link href="/portal">
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
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-40 pb-20">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/portal" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Image (if available) */}
              {post.imageUrl && (
                <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <header className="mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{post.author}</span>
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

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-blue-600">
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({node, ...props}) => <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-6" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 text-gray-700 leading-relaxed text-lg" {...props} />,
                    ul: ({node, ...props}) => <ul className="mb-6 ml-6 list-disc space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="mb-6 ml-6 list-decimal space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-700 leading-relaxed" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-blue-200 bg-blue-50 pl-6 py-4 my-6 italic text-gray-700" {...props} />
                    ),
                    code: ({node, inline, ...props}: any) =>
                      inline ? (
                        <code className="text-blue-600 bg-gray-100 px-2 py-0.5 rounded text-sm font-mono" {...props} />
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
                      ),
                    pre: ({node, ...props}) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />,
                    a: ({node, ...props}) => (
                      <a className="text-blue-600 hover:text-blue-700 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    img: ({node, ...props}) => (
                      <img className="rounded-lg my-6 w-full" {...props} alt={props.alt || 'Blog image'} />
                    ),
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    em: ({node, ...props}) => <em className="italic" {...props} />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Share this article
                    </h2>
                    <p className="text-gray-600">
                      Help others discover this content
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
                        '_blank'
                      )}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="hidden sm:inline">Twitter</span>
                    </button>
                    
                    <button 
                      onClick={() => window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`,
                        '_blank'
                      )}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl)
                        // You can add a toast notification here
                        alert('Link copied to clipboard!')
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/portal" className="inline-flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to all articles
                    </Link>
                  </Button>
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