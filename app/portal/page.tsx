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
          <div className="text-center">
            <Icons.Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
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
      <center>
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
              <p className="text-gray-600 text-lg">
                Insights, updates, and stories from our team
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="border-b">
          <div className="container px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-auto">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
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

        {/* Posts Grid */}
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="p-6 flex flex-col h-full">
                    {post.category && (
                      <span className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                        {post.category}
                      </span>
                    )}
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
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
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
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Icons.Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? `No posts matching "${searchQuery}"`
                  : 'No posts available in this category'}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      </center>
    </div>
  )
}