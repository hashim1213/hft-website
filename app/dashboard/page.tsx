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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
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
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Load posts on mount
  useEffect(() => {
    loadPosts()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...posts]
    
    // Filter by status tab
    if (activeTab === "published") {
      result = result.filter(post => post.status === "published")
    } else if (activeTab === "drafts") {
      result = result.filter(post => post.status === "draft")
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      )
    }
    
    setFilteredPosts(result)
  }, [posts, searchQuery, activeTab])

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

  // Handle status toggle
  const handleToggleStatus = async (post: BlogPost) => {
    if (!db) {
      setError("Database connection failed")
      return
    }

    const newStatus = post.status === "published" ? "draft" : "published"
    
    try {
      await updateDoc(doc(db, "posts", post.id), { 
        status: newStatus 
      })
      setSuccess(`Post ${newStatus === "published" ? "published" : "unpublished"} successfully`)
      await loadPosts()
    } catch (err) {
      console.error("Error updating post status:", err)
      setError("Failed to update post status")
    }
  }

  // Clear success/error messages after 5 seconds
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
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Sidebar and Content Layout */}
      <div className="flex flex-col h-screen">
        {/* Top Navbar */}
        <div className="border-b border-gray-800 py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo_white.png" 
                alt="ByteSavy Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push("/login")}
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Icons.LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-medium">Content Management</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Icons.Plus className="h-4 w-4 mr-2" />
                    <span>New Post</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl">
                      {editingPost ? "Edit Post" : "Create New Post"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleSubmit(e, "draft")} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="title" className="text-gray-400">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange(e, "title")}
                          placeholder="Enter post title"
                          disabled={loading}
                          className="w-full bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-400">Category</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => handleInputChange(value, "category")}
                          disabled={loading}
                        >
                          <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {CATEGORIES.map(({ value, label }) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt" className="text-gray-400">Excerpt</Label>
                        <Input
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange(e, "excerpt")}
                          placeholder="Brief description of your post"
                          disabled={loading}
                          className="w-full bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="content" className="text-gray-400">Content</Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => handleInputChange(e, "content")}
                          placeholder="Write your post content here..."
                          disabled={loading}
                          className="min-h-[250px] bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setIsDialogOpen(false)}
                        disabled={loading}
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        onClick={(e) => handleSubmit(e, "draft")}
                        disabled={loading}
                        className="bg-gray-700 hover:bg-gray-600 text-white"
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
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Icons.Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search posts..." 
                  className="pl-9 bg-gray-900 border-gray-800 text-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs 
                defaultValue="all" 
                className="w-full sm:w-auto"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full bg-gray-900">
                  <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-gray-800">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="published" className="flex-1 data-[state=active]:bg-gray-800">
                    Published
                  </TabsTrigger>
                  <TabsTrigger value="drafts" className="flex-1 data-[state=active]:bg-gray-800">
                    Drafts
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Alerts */}
          <div className="px-6 pt-3">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border border-red-800 text-red-300">
                <Icons.AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-900/20 border border-green-800 text-green-300">
                <Icons.CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Content List */}
          <div className="flex-1 overflow-auto p-6 pt-2">
            {loading && posts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <Icons.Loader2 className="mx-auto h-8 w-8 mb-4 animate-spin" />
                  <p>Loading posts...</p>
                </div>
              </div>
            ) : (
              <>
                {filteredPosts.length > 0 ? (
                  <div className="space-y-3">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row gap-0">
                            {/* Status Bar */}
                            <div className={`w-full h-1 sm:w-1 sm:h-full ${
                              post.status === "published" ? "bg-green-600" : "bg-yellow-600"
                            }`} />
                            
                            {/* Content */}
                            <div className="flex flex-col sm:flex-row justify-between items-start p-4 flex-grow">
                              <div className="space-y-1.5 flex-grow mr-3">
                                <h3 className="font-medium text-white">{post.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-1">{post.excerpt}</p>
                                
                                <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                                  <span className="flex items-center">
                                    <Icons.Calendar className="h-3.5 w-3.5 mr-1.5" />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center">
                                    <Icons.Tag className="h-3.5 w-3.5 mr-1.5" />
                                    {post.category}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex gap-2 mt-3 sm:mt-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleStatus(post)}
                                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                                >
                                  {post.status === "published" ? (
                                    <Icons.EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Icons.Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditPost(post)}
                                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                                >
                                  <Icons.Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
                                >
                                  <Icons.Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center py-12 text-gray-400 max-w-md">
                      <Icons.FileQuestion className="mx-auto h-10 w-10 mb-3 opacity-40" />
                      {searchQuery ? (
                        <>
                          <p className="text-lg mb-1">No matching posts found</p>
                          <p className="text-sm text-gray-500">Try adjusting your search query or filters</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg mb-1">No posts available</p>
                          <p className="text-sm text-gray-500">Click the "New Post" button to create your first post</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}