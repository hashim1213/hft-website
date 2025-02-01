"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
} from "firebase/firestore"
import Image from "next/image"

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

// Types
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  readTime: string
  status: "draft" | "published"
  category: string
}

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
] as const

export default function Dashboard() {
  const router = useRouter()
  
  // State management
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load posts on mount
  useEffect(() => {
    loadPosts()
  }, [])

  // Fetch posts from Firebase
  const loadPosts = async () => {
    if (!db) {
      setError("Database connection failed")
      return
    }

    setLoading(true)
    try {
      const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(postsQuery)
      
      const loadedPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
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

  // Form validation
  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required"
    if (!formData.excerpt.trim()) return "Excerpt is required"
    if (!formData.content.trim()) return "Content is required"
    if (!formData.category.trim()) return "Category is required"
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
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: "Admin",
        createdAt: serverTimestamp(),
        readTime: `${Math.ceil(formData.content.trim().split(/\s+/).length / 200)} min read`,
        status,
        category: formData.category.trim(),
      }

      if (editingPost) {
        await updateDoc(doc(db, "posts", editingPost.id), postData)
        setSuccess("Post updated successfully!")
      } else {
        await addDoc(collection(db, "posts"), postData)
        setSuccess(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`)
      }

      // Reset form and state
      setFormData({ title: "", excerpt: "", content: "", category: "" })
      setEditingPost(null)
      setIsDialogOpen(false)
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

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return
    }

    setLoading(true)
    try {
      await deleteDoc(doc(db, "posts", id))
      await loadPosts()
      setSuccess("Post deleted successfully")
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
      category: post.category,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Image 
            src="/logo2.png" 
            alt="Bytesavy Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/login")}
            disabled={loading}
          >
            <Icons.LogOut className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Posts</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={loading}>
                <Icons.Plus className="h-4 w-4 md:mr-2" />
                <span className="sr-only md:not-sr-only">
                  {loading ? "Loading..." : "New Post"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => handleSubmit(e, "draft")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    placeholder="Enter post title"
                    disabled={loading}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange(e, "excerpt")}
                    placeholder="Brief description of your post"
                    disabled={loading}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange(value, "category")}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange(e, "content")}
                    placeholder="Write your post content here..."
                    disabled={loading}
                    className="min-h-[200px]"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    onClick={(e) => handleSubmit(e, "draft")}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button 
                    type="button"
                    onClick={(e) => handleSubmit(e, "published")}
                    disabled={loading}
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {loading && posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icons.Loader2 className="mx-auto h-12 w-12 mb-4 animate-spin" />
              <p>Loading posts...</p>
            </div>
          ) : (
            <>
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-lg">{post.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              post.status === "published" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center">
                            <Icons.Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Icons.Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center">
                            <Icons.Tag className="h-4 w-4 mr-1" />
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end md:self-start">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPost(post)}
                          disabled={loading}
                        >
                          <Icons.Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeletePost(post.id)}
                          disabled={loading}
                        >
                          <Icons.Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!loading && posts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Icons.FileText className="mx-auto h-12 w-12 mb-4" />
                  <p>No posts yet. Start writing your first post!</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © 2025 Bytesavy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}