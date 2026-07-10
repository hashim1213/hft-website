'use client'
import { useEffect, useState, use } from 'react'
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore'
import { initializeApp, getApps } from 'firebase/app'
import { motion } from 'framer-motion'
import { Twitter, Linkedin } from 'lucide-react'
import { PersonRegular, CalendarRegular, ClockRegular, LinkRegular, ArrowLeftRegular, ArrowRightRegular } from '@fluentui/react-icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Head from 'next/head'

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
  category?: string
  tags?: string[]
  imageUrl?: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date).toUpperCase()
}

const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])

  const resolvedParams = use(params)

  useEffect(() => {
    const app = initializeFirebase()
    if (!app) return;

    const db = getFirestore(app)

    async function loadPost() {
      try {
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
          const loadedPost = {
            id: docSnap.id,
            ...data,
            createdAt: timestamp.toISOString()
          } as BlogPost
          setPost(loadedPost)
          await fetchRelatedPosts(data.category, data.tags, docSnap.id)
        } else {
          const allPostsQuery = query(
            collection(db, 'posts'),
            where('status', '==', 'published')
          )

          const allPostsSnapshot = await getDocs(allPostsQuery)

          let foundPost = null
          for (const docSnap of allPostsSnapshot.docs) {
            const data = docSnap.data()
            const generatedSlug = generateSlugFromTitle(data.title || '')
            if (generatedSlug === resolvedParams.slug) {
              foundPost = docSnap
              break
            }
          }

          if (foundPost) {
            const data = foundPost.data()
            const timestamp = data.createdAt?.toDate?.() || new Date()
            setPost({
              id: foundPost.id,
              ...data,
              slug: data.slug || generateSlugFromTitle(data.title || ''),
              createdAt: timestamp.toISOString()
            } as BlogPost)

            await fetchRelatedPosts(data.category, data.tags, foundPost.id)
          } else {
            setError('Blog post not found')
          }
        }
      } catch (err) {
        console.error('Error loading post:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    async function fetchRelatedPosts(category: string, tags: string[], currentPostId: string) {
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          where('status', '==', 'published')
        )

        const querySnapshot = await getDocs(postsQuery)

        const categories = new Set<string>()
        const scoredPosts = querySnapshot.docs
          .filter(doc => doc.id !== currentPostId)
          .map(doc => {
            const data = doc.data()
            if (data.category) categories.add(data.category)
            let score = 0
            if (data.category === category) score += 2
            if (tags && data.tags) {
              const matchingTags = data.tags.filter((tag: string) => tags.includes(tag))
              score += matchingTags.length
            }
            return {
              score,
              post: {
                id: doc.id,
                ...data,
                slug: data.slug || generateSlugFromTitle(data.title || doc.id),
                createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString()
              } as BlogPost
            }
          })
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(item => item.post)

        setAllCategories(Array.from(categories))
        setRelatedPosts(scoredPosts)
      } catch (err) {
        console.error('Error fetching related posts:', err)
      }
    }

    loadPost()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              <div className="space-y-6">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-5 w-96" />
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-64" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              <ArrowLeftRegular className="w-4 h-4 mr-2" />
              Back to all articles
            </Link>

            <Alert variant="destructive">
              <AlertDescription className="text-center py-2">
                {error || 'Blog post not found'}
              </AlertDescription>
            </Alert>

            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/blog">
                  View all articles
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formattedDate = formatDate(post.createdAt)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl || "https://bytesavy.com/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://bytesavy.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bytesavy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bytesavy.com/logo.png"
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "keywords": post.tags?.join(', ') || '',
    "articleSection": post.category || 'Technology',
    "inLanguage": "en-CA",
    "isAccessibleForFree": "true",
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://bytesavy.com/blog"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{post.title} | Bytesavy Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags?.join(', ')} />
        <meta name="author" content={post.author} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={currentUrl} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:author" content={post.author} />
        {post.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.imageUrl && <meta name="twitter:image" content={post.imageUrl} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
              {/* Main Content */}
              <article className="min-w-0">
                {/* Category */}
                {post.category && (
                  <Link
                    href={`/blog?category=${post.category}`}
                    className="inline-block text-blue-600 font-semibold text-sm mb-4 hover:underline"
                  >
                    {post.category.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Meta line */}
                <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600 mb-6">
                  <span>by</span>
                  <span className="font-medium text-gray-900">{post.author}</span>
                  <span className="mx-1">|</span>
                  <span>on {formattedDate}</span>
                  {post.category && (
                    <>
                      <span className="mx-1">|</span>
                      <span>in</span>
                      <Link href={`/blog?category=${post.category}`} className="text-blue-600 hover:underline">
                        {post.category.split('-').map(word =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Link>
                    </>
                  )}
                  <span className="mx-1">|</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentUrl)
                      alert('Link copied to clipboard!')
                    }}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <LinkRegular className="w-3.5 h-3.5" />
                    Permalink
                  </button>
                  <span className="mx-1">|</span>
                  <button
                    onClick={() => window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
                      '_blank'
                    )}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share
                  </button>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* Hero Image */}
                {post.imageUrl && (
                  <div className="mb-8">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:mb-6
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
                  prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2
                  prose-li:text-gray-800
                  prose-code:text-blue-700 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
                  prose-img:rounded-sm prose-img:w-full prose-img:my-8
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3" {...props} />,
                      h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-6 text-gray-800 leading-[1.8] text-[1.0625rem]" {...props} />,
                      ul: ({node, ...props}) => <ul className="mb-6 ml-6 list-disc space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="mb-6 ml-6 list-decimal space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-800 leading-relaxed" {...props} />,
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-4 border-blue-600 bg-blue-50 pl-6 py-4 my-6 text-gray-800" {...props} />
                      ),
                      code: ({node, inline, ...props}: any) =>
                        inline ? (
                          <code className="text-blue-700 bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                        ) : (
                          <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
                        ),
                      pre: ({node, ...props}) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />,
                      a: ({node, ...props}) => (
                        <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                      ),
                      img: ({node, ...props}) => (
                        <figure className="my-8">
                          <img className="rounded-sm w-full h-auto" {...props} alt={props.alt || 'Blog image'} />
                          {props.alt && props.alt !== 'Blog image' && (
                            <figcaption className="text-sm text-gray-500 mt-2 text-center italic">{props.alt}</figcaption>
                          )}
                        </figure>
                      ),
                      strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                      hr: ({node, ...props}) => <hr className="border-gray-200 my-10" {...props} />,
                      table: ({node, ...props}) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border border-gray-200 text-sm" {...props} />
                        </div>
                      ),
                      th: ({node, ...props}) => <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900" {...props} />,
                      td: ({node, ...props}) => <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props} />,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Tags at bottom */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Tags:</span>
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-sm hover:bg-blue-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share bar */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">Share:</span>
                    <button
                      onClick={() => window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
                        '_blank'
                      )}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      Twitter
                    </button>

                    <button
                      onClick={() => window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`,
                        '_blank'
                      )}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl)
                        alert('Link copied to clipboard!')
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkRegular className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-32 space-y-8">
                  {/* Resources */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/blog" className="text-blue-600 hover:underline text-sm">
                          All Articles
                        </Link>
                      </li>
                      <li>
                        <Link href="/#featured-work" className="text-blue-600 hover:underline text-sm">
                          Our Work
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="text-blue-600 hover:underline text-sm">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Blog Topics */}
                  {allCategories.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Blog Topics</h3>
                      <ul className="space-y-2">
                        {allCategories.map(cat => (
                          <li key={cat}>
                            <Link
                              href={`/blog?category=${cat}`}
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {cat.split('-').map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <>
                      <hr className="border-gray-200" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                        <ul className="space-y-4">
                          {relatedPosts.map(related => (
                            <li key={related.id}>
                              <Link
                                href={`/blog/${related.slug}`}
                                className="group block"
                              >
                                <p className="text-sm text-blue-600 group-hover:underline font-medium leading-snug">
                                  {related.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {related.readTime}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Contact CTA */}
                  <hr className="border-gray-200" />
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Need help with a project?</p>
                    <p className="text-xs text-gray-600 mb-3">Let&apos;s discuss how we can help modernize your operations.</p>
                    <Link href="/#contact" className="text-sm text-blue-600 hover:underline font-medium">
                      Get in touch &rarr;
                    </Link>
                  </div>
                </div>
              </aside>
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <ArrowLeftRegular className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
