'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, Clock, ArrowRight, Search, Tag } from "lucide-react"
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
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  readTime: string
  status: 'draft' | 'published'
  category?: string
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
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory, posts])

  const categories = ['all', ...new Set(posts.map(post => post.category || 'uncategorized').filter(Boolean))]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-40 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-40 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="pt-40 pb-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insights & Stories
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Exploring ideas, technology, and innovation in software development
            </motion.p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-2/3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles, authors, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full bg-white border-gray-200">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredPosts.length > 0 ? (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} Found
                </h2>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {filteredPosts.map((post) => {
                  // Use slug if available, otherwise fall back to id (for backward compatibility)
                  const postUrl = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`
                  
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group flex flex-col h-full border border-gray-200 rounded-xl overflow-hidden hover:border-blue-100 hover:shadow-md transition-all duration-200"
                    >
                      <Link href={postUrl} className="flex flex-col h-full">
                        {/* Featured Image */}
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
                        
                        <div className="p-6 flex flex-col h-full">
                          {/* Category Badge */}
                          {post.category && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full mb-4 w-fit">
                              <Tag className="h-3 w-3" />
                              {post.category}
                            </span>
                          )}
                          
                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h2>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="inline-flex px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{post.readTime}</span>
                              </div>
                              
                              <time 
                                dateTime={post.createdAt}
                                className="text-sm text-gray-500"
                              >
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </time>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{post.author}</span>
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                Read article
                                <ArrowRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  )
                })}
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="h-16 w-16 mx-auto text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}"`
                  : 'No articles available in this category'}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                View all articles
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}