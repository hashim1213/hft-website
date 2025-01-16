'use client'
import { motion } from "framer-motion"
import Link from "next/link"
import * as Icons from "lucide-react"
import { useEffect, useState } from "react"
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'

// Initialize Firebase
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
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc')
        )
        
        const querySnapshot = await getDocs(postsQuery)
        const loadedPosts = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.().toISOString() || new Date().toISOString()
          } as BlogPost))
          .filter(post => post.status === 'published') // Only show published posts

        setPosts(loadedPosts)
      } catch (err) {
        console.error('Error loading posts:', err)
        setError('Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <Icons.Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center text-red-600">
            <Icons.AlertCircle className="h-8 w-8 mx-auto" />
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology, development, and industry trends
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Icons.Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <span className="text-primary hover:underline inline-flex items-center gap-1">
                      Read more
                      <Icons.ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <Icons.FileText className="h-12 w-12 mx-auto mb-4" />
              <p>No blog posts available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}