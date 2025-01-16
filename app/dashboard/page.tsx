'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Footer from '@/components/Footer';
import * as Icons from "lucide-react";
import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('Missing Firebase configuration. Please check your environment variables.');
}

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: string;
  readTime: string;
  status: 'draft' | 'published';
}


export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    if (!db) {
      setError('Database connection failed. Please check your configuration.');
      return;
    }

    try {
      const postsQuery = query(
        collection(db, 'posts'), 
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(postsQuery);
      const loadedPosts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString()
        } as BlogPost;
      });
      
      setPosts(loadedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load posts. Please check your connection and try again.');
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!excerpt.trim()) {
      setError('Excerpt is required');
      return false;
    }
    if (!content.trim()) {
      setError('Content is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!db) {
      setError('Database connection failed. Please check your configuration.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const newPost = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        author: 'Admin',
        createdAt: serverTimestamp(),
        readTime: `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`,
        status
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);
      
      if (!docRef.id) {
        throw new Error('Failed to get document ID');
      }

      // Reset form and show success message
      setTitle('');
      setExcerpt('');
      setContent('');
      setSuccess(`Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      await loadPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!db) {
      setError('Database connection failed. Please check your configuration.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'posts', id));
        await loadPosts();
        setSuccess('Post deleted successfully');
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
          <Button variant="outline" onClick={() => router.push('/login')}>
            <Icons.LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="write" className="space-y-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="write">Write Post</TabsTrigger>
            <TabsTrigger value="manage">Manage Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
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
                
                <form className="space-y-4">
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
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post content here..."
                      className="min-h-[300px]"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      onClick={(e) => handleSubmit(e, 'draft')}
                      variant="outline"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Icons.Save className="mr-2 h-4 w-4" />
                          Save as Draft
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button"
                      onClick={(e) => handleSubmit(e, 'published')}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Icons.Send className="mr-2 h-4 w-4" />
                          Publish
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{post.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                post.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{post.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Icons.Calendar className="h-4 w-4" />
                              {new Date(post.createdAt).toLocaleDateString()}
                              <Icons.Clock className="h-4 w-4 ml-2" />
                              {post.readTime}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setTitle(post.title);
                                setExcerpt(post.excerpt);
                                setContent(post.content);
                                
                              }}
                            >
                              <Icons.Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}