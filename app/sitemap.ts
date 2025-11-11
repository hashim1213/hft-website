import { MetadataRoute } from 'next'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Helper function to generate slug from title
const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bytesavy.com'

  // Define your static routes with priorities
  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/web', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/mobile', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/ai', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/consulting', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/development', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/support', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/portal', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/canmade', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  const staticSitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  // Fetch blog posts from Firebase
  let blogSitemap: MetadataRoute.Sitemap = []

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const postsQuery = query(
      collection(db, 'posts'),
      where('status', '==', 'published')
    )

    const querySnapshot = await getDocs(postsQuery)

    blogSitemap = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      const slug = data.slug || generateSlugFromTitle(data.title || doc.id)
      const createdAt = data.createdAt?.toDate?.() || new Date()

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: createdAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Return static sitemap even if blog posts fail
  }

  return [...staticSitemap, ...blogSitemap]
}