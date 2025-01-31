'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import * as Icons from "lucide-react"
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

const BlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/blog/${post.id}`} className="block" aria-label={`Read ${post.title}`}>
        <div className="space-y-4">
          {post.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={post.imageUrl}
                alt=""
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icons.Clock className="h-4 w-4" aria-hidden="true" />
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
          
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 line-clamp-3">
            {post.excerpt}
          </p>
          
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-gray-500">{post.author}</span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              Read article
              <Icons.ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

const LoadingState = () => (
  <div className="text-center">
    <Icons.Loader2 className="h-8 w-8 animate-spin mx-auto" aria-hidden="true" />
    <p className="mt-2 text-gray-600" role="status">Loading posts...</p>
  </div>
)

const ErrorState = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <Icons.AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)

const EmptyState = () => (
  <div className="col-span-full text-center py-12 text-gray-500">
    <Icons.FileText className="h-12 w-12 mx-auto mb-4" aria-hidden="true" />
    <p>No blog posts available yet.</p>
  </div>
)

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(6)
      )
      
      const querySnapshot = await getDocs(postsQuery)
      const loadedPosts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.().toISOString() || new Date().toISOString()
        } as BlogPost))
        .filter(post => post.status === 'published')

      setPosts(loadedPosts)
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
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="blog-heading"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 id="blog-heading" className="text-3xl font-bold mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology, development, and industry trends
          </p>
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
            {posts.length === 0 && <EmptyState />}
          </div>
        )}
      </div>
    </section>
  )
}