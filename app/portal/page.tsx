'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'

// Initialize Firebase (using your existing config)
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
  category?: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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
          .filter(post => post.status === 'published')

        setPosts(loadedPosts)
        setFilteredPosts(loadedPosts)
      } catch (err) {
        console.error('Error loading posts:', err)
        setError('Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, posts])

  const categories = ['all', ...new Set(posts.map(post => post.category || 'uncategorized'))]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Icons.Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600">
            <Icons.AlertCircle className="h-8 w-8 mx-auto" />
            <p className="mt-2">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-5xl font-bold tracking-tight text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Insights & Stories
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Exploring ideas, technology, and innovation
              </motion.p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto py-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="w-full md:w-2/3">
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="space-y-4">
                    {post.category && (
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full">
                        {post.category}
                      </span>
                    )}
                    
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Icons.Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-900">{post.author}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                        Read article
                        <Icons.ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div 
              className="max-w-2xl mx-auto text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Icons.Search className="h-12 w-12 mx-auto text-gray-400 mb-6" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600 mb-8">
                {searchQuery
                  ? `No posts matching "${searchQuery}"`
                  : 'No posts available in this category'}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <center>
      <Footer />
      </center>
    </div>
  )
}