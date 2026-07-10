'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  DocumentRegular,
  EyeRegular,
  SaveRegular,
  SendRegular,
  ArrowLeftRegular,
  HomeRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular,
} from '@fluentui/react-icons'
import * as Icons from 'lucide-react'

export const dynamic = 'force-dynamic'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const CATEGORIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'ai-machine-learning', label: 'AI & Machine Learning' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'software-engineering', label: 'Software Engineering' },
  { value: 'business', label: 'Business' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'tutorials', label: 'Tutorials' },
]

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const estimateReadTime = (content: string): string => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

type ToolbarAction = {
  icon: React.ReactNode
  label: string
  prefix: string
  suffix: string
  block?: boolean
}

export default function CreateBlogPost() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('Bytesavy Team')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const auth = getAuth(app)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      } else {
        setAuthenticated(true)
      }
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const toolbarActions: ToolbarAction[] = [
    { icon: <Icons.Heading1 className="w-4 h-4" />, label: 'Heading 1', prefix: '# ', suffix: '', block: true },
    { icon: <Icons.Heading2 className="w-4 h-4" />, label: 'Heading 2', prefix: '## ', suffix: '', block: true },
    { icon: <Icons.Heading3 className="w-4 h-4" />, label: 'Heading 3', prefix: '### ', suffix: '', block: true },
    { icon: <Icons.Bold className="w-4 h-4" />, label: 'Bold', prefix: '**', suffix: '**' },
    { icon: <Icons.Italic className="w-4 h-4" />, label: 'Italic', prefix: '*', suffix: '*' },
    { icon: <Icons.Code className="w-4 h-4" />, label: 'Inline Code', prefix: '`', suffix: '`' },
    { icon: <Icons.Link className="w-4 h-4" />, label: 'Link', prefix: '[', suffix: '](url)' },
    { icon: <Icons.Image className="w-4 h-4" />, label: 'Image', prefix: '![alt](', suffix: ')' },
    { icon: <Icons.Quote className="w-4 h-4" />, label: 'Blockquote', prefix: '> ', suffix: '', block: true },
    { icon: <Icons.List className="w-4 h-4" />, label: 'Bullet List', prefix: '- ', suffix: '', block: true },
    { icon: <Icons.ListOrdered className="w-4 h-4" />, label: 'Numbered List', prefix: '1. ', suffix: '', block: true },
    { icon: <Icons.Minus className="w-4 h-4" />, label: 'Divider', prefix: '\n---\n', suffix: '', block: true },
    { icon: <Icons.Table className="w-4 h-4" />, label: 'Table', prefix: '| Header | Header |\n| --- | --- |\n| Cell | Cell |', suffix: '', block: true },
    { icon: <Icons.FileCode className="w-4 h-4" />, label: 'Code Block', prefix: '```\n', suffix: '\n```', block: true },
  ]

  const insertMarkdown = useCallback((action: ToolbarAction) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let newText: string
    if (action.block && !selectedText) {
      newText = content.substring(0, start) + action.prefix + action.suffix + content.substring(end)
    } else {
      newText = content.substring(0, start) + action.prefix + (selectedText || 'text') + action.suffix + content.substring(end)
    }

    setContent(newText)
    setTimeout(() => {
      textarea.focus()
      const cursorPos = start + action.prefix.length + (selectedText ? selectedText.length : (action.block && !selectedText ? 0 : 4))
      textarea.setSelectionRange(cursorPos, cursorPos)
    }, 0)
  }, [content])

  const handleSave = async (status: 'draft' | 'published') => {
    if (!title.trim()) {
      setSaveStatus('error')
      setSaveMessage('Title is required.')
      setTimeout(() => setSaveStatus('idle'), 4000)
      return
    }
    if (!content.trim()) {
      setSaveStatus('error')
      setSaveMessage('Content is required.')
      setTimeout(() => setSaveStatus('idle'), 4000)
      return
    }
    if (!author.trim()) {
      setSaveStatus('error')
      setSaveMessage('Author is required.')
      setTimeout(() => setSaveStatus('idle'), 4000)
      return
    }

    setSaving(true)
    setSaveStatus('idle')

    try {
      const app = getApps()[0]
      const db = getFirestore(app)
      const slug = generateSlug(title)
      const readTime = estimateReadTime(content)
      const tagList = tags.split(',').map(t => t.trim()).filter(Boolean)

      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        slug,
        excerpt: excerpt.trim() || content.trim().substring(0, 160) + '...',
        content: content.trim(),
        author: author.trim(),
        category: category || 'uncategorized',
        tags: tagList,
        imageUrl: imageUrl.trim() || null,
        readTime,
        status,
        createdAt: serverTimestamp(),
      })

      setSaveStatus('success')
      setSaveMessage(status === 'published' ? 'Post published successfully!' : 'Draft saved successfully!')

      if (status === 'published') {
        setTimeout(() => {
          router.push(`/blog/${slug}`)
        }, 1500)
      } else {
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (err) {
      console.error('Error saving post:', err)
      setSaveStatus('error')
      setSaveMessage('Failed to save. Please try again.')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    )
  }

  if (!authenticated) return null

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 py-3 px-6 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftRegular className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-sm font-medium text-gray-900">New Post</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="text-gray-500"
            >
              <HomeRegular className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Status Toast */}
            {saveStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                  saveStatus === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {saveStatus === 'success' ? (
                  <CheckmarkCircleRegular className="w-5 h-5 text-green-600" />
                ) : (
                  <DismissCircleRegular className="w-5 h-5 text-red-600" />
                )}
                {saveMessage}
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
              {/* Main Editor Column */}
              <div className="space-y-6 min-w-0">
                {/* Title */}
                <div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Article title"
                    className="w-full text-3xl md:text-4xl font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-normal border-0 outline-none bg-transparent leading-tight"
                  />
                  {title && (
                    <p className="mt-2 text-xs text-gray-400 font-mono">
                      /blog/{generateSlug(title)}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <Textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a brief abstract or summary (appears on the blog listing and in search results)..."
                    className="resize-none h-20 text-sm border-gray-200 bg-gray-50/50"
                    maxLength={300}
                  />
                  <p className="text-xs text-gray-400 mt-1">{excerpt.length}/300 characters</p>
                </div>

                {/* Editor */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Tab Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/80 px-4">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab('write')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                          activeTab === 'write'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <DocumentRegular className="w-4 h-4" />
                        Write
                      </button>
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                          activeTab === 'preview'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <EyeRegular className="w-4 h-4" />
                        Preview
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{wordCount} words</span>
                      <span>&middot;</span>
                      <span>{estimateReadTime(content)}</span>
                    </div>
                  </div>

                  {/* Toolbar */}
                  {activeTab === 'write' && (
                    <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-white overflow-x-auto">
                      {toolbarActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => insertMarkdown(action)}
                          title={action.label}
                          className="p-2 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Content Area */}
                  {activeTab === 'write' ? (
                    <textarea
                      id="content-editor"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={`Write your article using Markdown...\n\n## Introduction\n\nProvide context and background for your topic.\n\n## Background\n\nReview relevant prior work or context.\n\n## Methodology / Approach\n\nDescribe your approach or the technical details.\n\n## Results / Implementation\n\nPresent your findings, code, or implementation.\n\n## Discussion\n\nAnalyze the implications.\n\n## Conclusion\n\nSummarize key takeaways and future directions.`}
                      className="w-full min-h-[550px] p-6 text-[15px] leading-[1.8] font-mono text-gray-800 placeholder:text-gray-300 focus:outline-none resize-y bg-white"
                      spellCheck
                    />
                  ) : (
                    <div className="min-h-[550px] p-8 bg-white">
                      {content ? (
                        <article className="prose prose-lg max-w-none
                          prose-headings:text-gray-900 prose-headings:font-bold
                          prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
                          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                          prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[1.0625rem]
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                          prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
                          prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2
                          prose-li:text-gray-800
                          prose-code:text-blue-700 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
                          prose-img:rounded-lg prose-img:w-full prose-img:my-8 prose-img:shadow-sm
                          prose-table:border-collapse prose-table:w-full
                          prose-th:border prose-th:border-gray-200 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-sm
                          prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2.5 prose-td:text-sm
                          prose-hr:border-gray-200 prose-hr:my-10
                        ">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {content}
                          </ReactMarkdown>
                        </article>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                          <EyeRegular className="w-10 h-10 mb-3 text-gray-300" />
                          <p className="text-sm">Start writing to see a preview</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Publish Actions */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-4 sticky top-20">
                  <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">Publish</h3>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleSave('published')}
                      disabled={saving}
                      className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <SendRegular className="w-4 h-4" />
                      {saving ? 'Publishing...' : 'Publish'}
                    </Button>
                    <Button
                      onClick={() => handleSave('draft')}
                      disabled={saving}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <SaveRegular className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save as Draft'}
                    </Button>
                  </div>
                </div>

                {/* Author */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Author</Label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="border-gray-200"
                  />
                </div>

                {/* Category */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Tags</Label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="react, nextjs, firebase"
                    className="border-gray-200"
                  />
                  <p className="text-xs text-gray-400">Comma-separated</p>
                </div>

                {/* Cover Image */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Cover Image</Label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="border-gray-200"
                  />
                  {imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imageUrl}
                        alt="Cover preview"
                        className="w-full h-28 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>

                {/* Academic Writing Guide */}
                <div className="border border-gray-200 rounded-lg p-5 space-y-3 bg-blue-50/30">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-700">Writing Guide</h3>
                  <ul className="text-xs text-gray-600 space-y-2.5 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">H2</span>
                      <span>Use for main sections (Introduction, Methods, Results)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">H3</span>
                      <span>Use for subsections within a main section</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-mono">{'>'}  </span>
                      <span>Blockquotes for key insights or citations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-mono">```</span>
                      <span>Fenced code blocks with language for syntax highlighting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-mono">[x]</span>
                      <span>Inline links for references and citations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-mono">|</span>
                      <span>GFM tables for structured data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
