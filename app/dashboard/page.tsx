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
  status: "draft" | "published"
  category: string
}

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    if (!db) {
      setError("Database connection failed. Please check your configuration.")
      return
    }

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
      setError("Failed to load posts. Please check your connection and try again.")
    }
  }

  const validateForm = () => {
    if (!title.trim()) {
      setError("Title is required")
      return false
    }
    if (!excerpt.trim()) {
      setError("Excerpt is required")
      return false
    }
    if (!content.trim()) {
      setError("Content is required")
      return false
    }
    if (!category.trim()) {
      setError("Category is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!db) {
      setError("Database connection failed. Please check your configuration.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const newPost = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        author: "Admin",
        createdAt: serverTimestamp(),
        readTime: `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`,
        status,
        category: category.trim(),
      }

      if (editingPost) {
        await updateDoc(doc(db, "posts", editingPost.id), newPost)
        setSuccess("Post updated successfully!")
      } else {
        const docRef = await addDoc(collection(db, "posts"), newPost)
        if (!docRef.id) {
          throw new Error("Failed to get document ID")
        }
        setSuccess(`Post ${status === "published" ? "published" : "saved as draft"} successfully!`)
      }

      setTitle("")
      setExcerpt("")
      setContent("")
      setCategory("")
      setEditingPost(null)
      await loadPosts()
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Error creating/updating post:", err)
      setError("Failed to create/update post. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!db) {
      setError("Database connection failed. Please check your configuration.")
      return
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true)
      try {
        await deleteDoc(doc(db, "posts", id))
        await loadPosts()
        setSuccess("Post deleted successfully")
      } catch (err) {
        console.error("Error deleting post:", err)
        setError("Failed to delete post. Please check your connection and try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setTitle(post.title)
    setExcerpt(post.excerpt)
    setContent(post.content)
    setCategory(post.category)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Image src="/logo2.png" alt="Bytesavy Logo" width={120} height={40} className="h-10 w-auto" />
          <div className="flex items-center space-x-4">
           
            <Button variant="outline" size="sm" onClick={() => router.push("/login")}>
              <Icons.LogOut className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Posts</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Icons.Plus className="h-4 w-4 md:mr-2" />
                <span className="sr-only md:not-sr-only">New Post</span>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of your post"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="min-h-[200px]"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={(e) => handleSubmit(e, "draft")}>
                    Save as Draft
                  </Button>
                  <Button type="button" onClick={(e) => handleSubmit(e, "published")}>
                    Publish
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-lg">{post.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
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
                    <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                      <Icons.Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                      <Icons.Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icons.FileText className="mx-auto h-12 w-12 mb-4" />
              <p>No posts yet. Start writing your first post!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © 2025 Bytesavy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

