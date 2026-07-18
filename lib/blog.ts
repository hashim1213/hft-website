import { getApps, initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { getAllPosts, getPost, type WordPressPost } from "@/lib/wordpress"

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
}

function dateValue(value: unknown): string {
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString()
  }
  const date = new Date(String(value || ""))
  return Number.isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString()
}

async function getFirebasePosts(): Promise<WordPressPost[]> {
  try {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
    if (!config.apiKey || !config.projectId) return []

    const app = getApps().find(item => item.name === "bytesavy-blog") || initializeApp(config, "bytesavy-blog")
    const snapshot = await getDocs(collection(getFirestore(app), "posts"))

    return snapshot.docs
      .map(document => {
        const data = document.data()
        const title = String(data.title || "Untitled")
        return {
          id: Number.parseInt(document.id.replace(/\D/g, "").slice(0, 9), 10) || Math.abs(document.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)),
          slug: String(data.slug || slugify(title) || document.id),
          date: dateValue(data.createdAt),
          title: { rendered: title },
          excerpt: { rendered: String(data.excerpt || "") },
          content: { rendered: String(data.content || "") },
          _embedded: data.imageUrl ? { "wp:featuredmedia": [{ source_url: String(data.imageUrl), alt_text: title }] } : undefined,
        } satisfies WordPressPost
      })
      .filter((_, index) => snapshot.docs[index].data().status === "published")
  } catch (error) {
    console.error("Unable to load Firebase blog posts:", error)
    return []
  }
}

export async function getAllBlogPosts(): Promise<WordPressPost[]> {
  const [wordpressPosts, firebasePosts] = await Promise.all([getAllPosts(), getFirebasePosts()])
  const posts = new Map<string, WordPressPost>()

  firebasePosts.forEach(post => posts.set(post.slug, post))
  wordpressPosts.forEach(post => posts.set(post.slug, post))

  return Array.from(posts.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getRecentBlogPosts(limit = 3) {
  return (await getAllBlogPosts()).slice(0, limit)
}

export async function getBlogPost(slug: string): Promise<WordPressPost | null> {
  const wordpressPost = await getPost(slug)
  if (wordpressPost) return wordpressPost
  const firebasePosts = await getFirebasePosts()
  return firebasePosts.find(post => post.slug === slug) || null
}
