'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { ClockRegular, ArrowRightRegular, SpinnerIosRegular, WarningRegular, DocumentRegular } from "@fluentui/react-icons"
import { useEffect, useState, useCallback } from "react"
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, orderBy, getDocs, limit } from 'firebase/firestore'
import { Alert, AlertDescription } from "@/components/ui/alert"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

interface BlogPost {
  id: string
  slug: string // Added slug field
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

// Utility function to generate fallback slug from title if slug is missing
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  // Use slug if available, otherwise fall back to id (for backward compatibility during migration)
  const postUrl = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group h-full overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <Link href={postUrl} className="block h-full" aria-label={`Read ${post.title}`}>
        <div className="flex flex-col h-full">
          {post.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex flex-col p-6 flex-grow">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <ClockRegular className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{post.readTime}</span>
              <span className="mx-2" aria-hidden="true">•</span>
              <time dateTime={post.createdAt}>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }).format(new Date(post.createdAt))}
              </time>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-3">
              {post.title}
            </h3>

            <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-end pt-4 mt-auto">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                Read article
                <ArrowRightRegular className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

const LoadingState = () => (
  <div className="text-center py-12">
    <SpinnerIosRegular className="h-10 w-10 animate-spin mx-auto text-primary" aria-hidden="true" />
    <p className="mt-4 text-gray-600" role="status">Loading articles...</p>
  </div>
)

const ErrorState = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="max-w-2xl mx-auto">
    <WarningRegular className="h-4 w-4" />
    <AlertDescription className="py-1">{message}</AlertDescription>
  </Alert>
)

const EmptyState = () => (
  <div className="col-span-full text-center py-16 text-gray-500">
    <DocumentRegular className="h-16 w-16 mx-auto mb-4 text-gray-300" aria-hidden="true" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles available</h3>
    <p className="text-gray-600">We'll be publishing new content soon. Check back later!</p>
  </div>
)

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [recommendedPosts, setRecommendedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(9)
      )

      const querySnapshot = await getDocs(postsQuery)
      const loadedPosts = querySnapshot.docs
        .map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            // Generate slug from title if missing (backward compatibility)
            slug: data.slug || generateSlugFromTitle(data.title || doc.id),
            createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString()
          } as BlogPost
        })
        .filter(post => post.status === 'published')

      // Set first 6 as main posts
      setPosts(loadedPosts.slice(0, 6))

      // Set last 3 as recommended posts
      setRecommendedPosts(loadedPosts.slice(6, 9))
    } catch (err) {
      console.error('Error loading posts:', err)
      setError('Failed to load blog posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <section
      id="blog"
      className=""
      aria-labelledby="blog-heading"
    >
      <div className="container px-4 md:px-6">

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        
        {!loading && !error && (
          <>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
            
            {posts.length > 0 && (
              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View all articles
                  <ArrowRightRegular className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Recommended Reading Section */}
            {recommendedPosts.length > 0 && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Recommended Reading
                  </h3>
                  <p className="text-gray-600 max-w-xl mx-auto">
                    More articles you might find interesting
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recommendedPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}