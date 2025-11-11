"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import * as Icons from "lucide-react"
import { initializeApp, getApps } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Firebase configuration check
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error("Missing Firebase configuration. Please check your environment variables.")
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)
const storage = getStorage(app)

// Types
interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  readTime: string
  status: "draft" | "published"
  category: string
  tags?: string[]
  imageUrl?: string
  images?: string[]
}

// Utility function to generate slug from title
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "software-development", label: "Software Development" },
  { value: "ai-machine-learning", label: "AI & Machine Learning" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "business", label: "Business" },
  { value: "case-studies", label: "Case Studies" },
  { value: "tutorials", label: "Tutorials" },
] as const

export default function Dashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State management
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    tags: "",
    author: "Bytesavy Team",
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Load posts on mount
  useEffect(() => {
    loadPosts()
  }, [])

  // Filter posts based on search and tab
  useEffect(() => {
    let filtered = posts

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter(post => post.status === activeTab)
    }

    setFilteredPosts(filtered)
  }, [searchQuery, activeTab, posts])

  // Load posts from Firestore
  const loadPosts = async () => {
    setLoading(true)
    try {
      const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(postsQuery)

      const loadedPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          slug: data.slug || generateSlugFromTitle(data.title || doc.id),
          createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
        } as BlogPost
      })

      setPosts(loadedPosts)
    } catch (err) {
      console.error("Error loading posts:", err)
      setError("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB")
      return
    }

    setUploadingImage(true)
    setError("")

    try {
      // Create a unique filename
      const filename = `blog-images/${Date.now()}-${file.name}`
      const storageRef = ref(storage, filename)

      // Upload file
      await uploadBytes(storageRef, file)

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef)

      // Update form data with image URL
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }))
      setSuccess("Image uploaded successfully!")
    } catch (err) {
      console.error("Error uploading image:", err)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  // Form validation
  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required"
    if (!formData.excerpt.trim()) return "Excerpt is required"
    if (!formData.content.trim()) return "Content is required"
    if (!formData.category.trim()) return "Category is required"
    if (!formData.author.trim()) return "Author is required"
    return null
  }

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    field: keyof typeof formData
  ) => {
    const value = typeof e === 'string' ? e : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    if (!db) {
      setError("Database connection failed")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const slug = generateSlugFromTitle(formData.title.trim())

      // Process tags from comma-separated string
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const postData = {
        title: formData.title.trim(),
        slug: slug,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        createdAt: editingPost ? undefined : serverTimestamp(),
        updatedAt: serverTimestamp(),
        readTime: `${Math.ceil(formData.content.trim().split(/\s+/).length / 200)} min read`,
        status,
        category: formData.category.trim(),
        tags: tagsArray,
        imageUrl: formData.imageUrl.trim() || null,
      }

      if (editingPost) {
        await updateDoc(doc(db, "posts", editingPost.id), postData)
        setSuccess("Post updated successfully!")
      } else {
        await addDoc(collection(db, "posts"), postData)
        setSuccess(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`)
      }

      // Reset form and state
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        imageUrl: "",
        tags: "",
        author: "Bytesavy Team"
      })
      setEditingPost(null)
      setIsSheetOpen(false)
      await loadPosts()
    } catch (err) {
      console.error("Error saving post:", err)
      setError("Failed to save post")
    } finally {
      setLoading(false)
    }
  }

  // Handle post deletion
  const handleDeletePost = async (id: string) => {
    if (!db) {
      setError("Database connection failed")
      return
    }

    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    setLoading(true)
    try {
      await deleteDoc(doc(db, "posts", id))
      setSuccess("Post deleted successfully")
      await loadPosts()
    } catch (err) {
      console.error("Error deleting post:", err)
      setError("Failed to delete post")
    } finally {
      setLoading(false)
    }
  }

  // Handle post editing
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category || "",
      imageUrl: post.imageUrl || "",
      tags: post.tags?.join(', ') || "",
      author: post.author || "Bytesavy Team",
    })
    setIsSheetOpen(true)
  }

  // Handle status toggle
  const handleToggleStatus = async (post: BlogPost) => {
    if (!db) {
      setError("Database connection failed")
      return
    }

    const newStatus = post.status === "published" ? "draft" : "published"

    setLoading(true)
    try {
      await updateDoc(doc(db, "posts", post.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      })
      setSuccess(`Post ${newStatus === "published" ? "published" : "unpublished"} successfully`)
      await loadPosts()
    } catch (err) {
      console.error("Error updating post status:", err)
      setError("Failed to update post status")
    } finally {
      setLoading(false)
    }
  }

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("")
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo2.png"
              alt="ByteSavy Logo"
              className="h-8 w-auto"
            />
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">Blog Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              <Icons.Home className="h-4 w-4 mr-2" />
              <span>Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/login")}
              className="text-gray-600 hover:text-gray-900"
            >
              <Icons.LogOut className="h-4 w-4 mr-2" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Alerts */}
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <Icons.CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <Icons.AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Icons.Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts by title, excerpt, or category..."
                className="pl-9 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setEditingPost(null)
                    setFormData({
                      title: "",
                      excerpt: "",
                      content: "",
                      category: "",
                      imageUrl: "",
                      tags: "",
                      author: "Bytesavy Team"
                    })
                  }}
                >
                  <Icons.PlusCircle className="h-4 w-4 mr-2" />
                  <span>New Post</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={`bg-white p-0 ${isFullscreen ? 'w-full max-w-full' : 'sm:max-w-2xl'}`}
              >
                <div className="flex flex-col h-full">
                  {/* Editor Header */}
                  <SheetHeader className="border-b border-gray-200 p-6 space-y-0">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Icons.FileText className="h-5 w-5" />
                        {editingPost ? "Edit Post" : "Create New Post"}
                      </SheetTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {isFullscreen ? (
                          <Icons.Minimize2 className="h-4 w-4" />
                        ) : (
                          <Icons.Maximize2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </SheetHeader>

                  {/* Editor Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={(e) => handleSubmit(e, "draft")} className="space-y-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          <Icons.FileEdit className="h-4 w-4" />
                          Basic Information
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-gray-700">Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange(e, "title")}
                            placeholder="Enter a compelling post title"
                            disabled={loading}
                            className="bg-white border-gray-200"
                          />
                          {formData.title && (
                            <p className="text-xs text-gray-500">
                              SEO Slug: {generateSlugFromTitle(formData.title)}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="excerpt" className="text-gray-700">Excerpt *</Label>
                          <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => handleInputChange(e, "excerpt")}
                            placeholder="Brief description (150-160 characters for optimal SEO)"
                            disabled={loading}
                            rows={2}
                            maxLength={160}
                            className="bg-white border-gray-200 resize-none"
                          />
                          <p className="text-xs text-gray-500">
                            {formData.excerpt.length}/160 characters
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="author" className="text-gray-700">Author *</Label>
                            <Input
                              id="author"
                              value={formData.author}
                              onChange={(e) => handleInputChange(e, "author")}
                              placeholder="Author name"
                              disabled={loading}
                              className="bg-white border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-700">Category *</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleInputChange(value, "category")}
                              disabled={loading}
                            >
                              <SelectTrigger className="bg-white border-gray-200">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {CATEGORIES.map(({ value, label }) => (
                                  <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Featured Image */}
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          <Icons.Image className="h-4 w-4" />
                          Featured Image
                        </div>

                        <div className="space-y-4">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploadingImage}
                              className="flex-1"
                            >
                              <Icons.Upload className="h-4 w-4 mr-2" />
                              {uploadingImage ? "Uploading..." : "Upload Image"}
                            </Button>
                          </div>

                          {formData.imageUrl && (
                            <div className="relative">
                              <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setFormData(prev => ({ ...prev, imageUrl: "" }))}
                              >
                                <Icons.X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          <p className="text-xs text-gray-500">
                            Max file size: 5MB. Recommended: 1200x630px for optimal social sharing.
                          </p>
                        </div>
                      </div>

                      {/* Tags & SEO */}
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          <Icons.Tags className="h-4 w-4" />
                          Tags & SEO Keywords
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags" className="text-gray-700">Tags</Label>
                          <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => handleInputChange(e, "tags")}
                            placeholder="React, Next.js, AI, Machine Learning"
                            disabled={loading}
                            className="bg-white border-gray-200"
                          />
                          <p className="text-xs text-gray-500">
                            Separate with commas. Use 3-5 tags for best SEO results.
                          </p>
                        </div>
                      </div>

                      {/* Content Editor */}
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            <Icons.Code className="h-4 w-4" />
                            Content (Markdown)
                          </div>
                          <span className="text-xs text-gray-500">
                            {Math.ceil(formData.content.split(/\s+/).length / 200)} min read
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleInputChange(e, "content")}
                            placeholder="Write your post content here using Markdown...

## Example Heading
Write **bold** or *italic* text

- Bullet point 1
- Bullet point 2

[Link text](https://example.com)

![Image](https://example.com/image.jpg)

> This is a quote

\`\`\`javascript
const code = 'example';
\`\`\`"
                            disabled={loading}
                            className={`bg-white border-gray-200 font-mono text-sm resize-none ${
                              isFullscreen ? 'min-h-[calc(100vh-32rem)]' : 'min-h-[400px]'
                            }`}
                          />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Supports full Markdown syntax</span>
                            <span>{formData.content.split(/\s+/).filter(Boolean).length} words</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsSheetOpen(false)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="outline"
                          onClick={(e) => handleSubmit(e, "draft")}
                          disabled={loading}
                          className="border-gray-300"
                        >
                          {loading ? "Saving..." : "Save as Draft"}
                        </Button>
                        <Button
                          type="button"
                          onClick={(e) => handleSubmit(e, "published")}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {loading ? "Publishing..." : "Publish"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="all">All ({posts.length})</TabsTrigger>
              <TabsTrigger value="published">
                Published ({posts.filter(p => p.status === "published").length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({posts.filter(p => p.status === "draft").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPost(post)}
                        className="flex-1"
                      >
                        <Icons.Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(post)}
                        className="flex-1"
                      >
                        {post.status === "published" ? (
                          <>
                            <Icons.EyeOff className="h-3 w-3 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Icons.Eye className="h-3 w-3 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Icons.Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Icons.FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">
                {searchQuery ? "Try adjusting your search query" : "Create your first blog post to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
