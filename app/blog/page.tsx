'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SpinnerIosRegular, WarningRegular, SearchRegular, CalendarRegular, FilterRegular } from "@fluentui/react-icons"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'

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

const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

const getAuthorInitial = (name: string): string => {
  return name.charAt(0).toUpperCase()
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

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
            <SpinnerIosRegular className="w-10 h-10 animate-spin mx-auto text-blue-600" />
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
            <WarningRegular className="w-12 h-12 mx-auto text-red-500 mb-4" />
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
        {/* Header Section */}
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' }
              ]}
            />

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-8">
              Bytesavy Blog
            </h1>

            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read the post
                  </Link>
                </div>
                {featuredPost.imageUrl && (
                  <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden rounded-lg">
                    <img
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Newest Posts Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Newest posts</h2>

          {/* Filter and Search */}
          <div className="flex items-center gap-4 mb-2 pb-6 border-b border-gray-200">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-900 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <FilterRegular className="w-4 h-4" />
              Filter
            </button>
            <div className="flex-1 flex items-center gap-3 border-b border-gray-300 pb-1">
              <SearchRegular className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Filter options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-4 border-b border-gray-200 mb-6"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Post count */}
          <p className="text-sm text-gray-600 mt-6 mb-8">
            Displaying 1-{filteredPosts.length} ({filteredPosts.length})
          </p>

          {/* Posts Grid */}
          {remainingPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {remainingPosts.map((post) => {
                const postUrl = `/blog/${post.slug}`

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group pb-10 border-b border-gray-100"
                  >
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <CalendarRegular className="w-4 h-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>

                    {/* Title */}
                    <Link href={postUrl}>
                      <h3 className="text-xl font-bold text-blue-600 hover:underline mb-3 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{getAuthorInitial(post.author)}</span>
                      </div>
                      <span className="text-sm text-gray-700">{post.author}</span>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SearchRegular className="w-16 h-16 mx-auto text-gray-300 mb-6" />
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
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}
