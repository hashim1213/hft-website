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

// Utility function to get relative time
const getRelativeTime = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} min`
  if (diffInHours < 24) return `${diffInHours}h`
  if (diffInDays < 30) return `${diffInDays}d`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
  
  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-32">
        {/* Page Title and Filters */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">Insights</h1>
              <p className="text-lg text-gray-600">Latest articles, stories, and ideas</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 pl-10 border-0 focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[140px] bg-gray-50 border-0 focus:ring-1 focus:ring-gray-300">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Topics' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchQuery || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="text-gray-600 hover:text-gray-900 text-sm underline"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Featured Hero Article */}
            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 pb-12 border-b border-gray-200"
              >
                <Link href={featuredPost.slug ? `/blog/${featuredPost.slug}` : `/blog/${featuredPost.id}`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    {featuredPost.imageUrl && (
                      <div className="relative w-full h-[400px] overflow-hidden rounded-sm">
                        <img
                          src={featuredPost.imageUrl}
                          alt={featuredPost.title}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={featuredPost.imageUrl ? '' : 'md:col-span-2'}>
                      {featuredPost.category && (
                        <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold mb-4 rounded-sm">
                          {featuredPost.category.toUpperCase()}
                        </span>
                      )}
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight hover:text-gray-700 transition-colors">
                        {featuredPost.title}
                      </h1>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{featuredPost.author}</span>
                        <span>•</span>
                        <span>{getRelativeTime(featuredPost.createdAt)}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}

            {/* Latest Articles Grid */}
            {remainingPosts.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Latest</h2>
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
                  {remainingPosts.map((post, index) => {
                    const postUrl = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`

                    // Vary card sizes for visual interest
                    const isLarge = index % 5 === 0
                    const cardClass = isLarge ? "md:col-span-2 lg:col-span-2" : ""

                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`group border-b border-gray-200 pb-6 ${cardClass}`}
                      >
                        <Link href={postUrl}>
                          <div className={`flex ${isLarge ? 'flex-row gap-6' : 'flex-col gap-4'}`}>
                            {/* Image */}
                            {post.imageUrl && (
                              <div className={`relative overflow-hidden rounded-sm ${isLarge ? 'w-1/2 h-[300px]' : 'w-full h-[200px]'}`}>
                                <img
                                  src={post.imageUrl}
                                  alt={post.title}
                                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className={isLarge ? 'w-1/2 flex flex-col justify-center' : ''}>
                              <div className="flex items-center gap-3 mb-3">
                                {post.category && (
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {post.category}
                                  </span>
                                )}
                                <span className="text-red-500 text-sm font-medium">
                                  {getRelativeTime(post.createdAt)}
                                </span>
                              </div>

                              <h2 className={`font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-3 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                                {post.title}
                              </h2>

                              {isLarge && (
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}

                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">{post.author}</span>
                                {post.readTime && (
                                  <>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    )
                  })}
                </motion.div>
              </>
            )}
          </div>
        ) : (
          <motion.div
            className="py-16 text-center max-w-7xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="h-16 w-16 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
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
              className="bg-gray-900 hover:bg-gray-800"
            >
              View all articles
            </Button>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  )
}