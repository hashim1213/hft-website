// scripts/migrate-posts.ts
// This script adds slug fields to existing blog posts

import { config } from 'dotenv'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, query, getDocs, writeBatch, doc } from 'firebase/firestore'

// Load environment variables
config({ path: '.env.local' })

console.log('🔧 Loading Firebase configuration...')
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Validate required config
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error('❌ Missing Firebase configuration. Please check your .env.local file.')
  console.log('Required variables:')
  console.log('- NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  console.log('- NEXT_PUBLIC_FIREBASE_API_KEY')
  console.log('- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
  process.exit(1)
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

// Utility function to generate URL-friendly slugs
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Function to ensure slug uniqueness
const generateUniqueSlug = async (title: string, existingSlugs: Set<string>): Promise<string> => {
  const baseSlug = generateSlug(title)
  let slug = baseSlug
  let counter = 1

  // Check if slug exists in our set
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  existingSlugs.add(slug)
  return slug
}

// Main migration function
const migratePosts = async () => {
  try {
    console.log('🚀 Starting blog posts migration...')
    
    // Get all posts
    const postsQuery = query(collection(db, 'posts'))
    const querySnapshot = await getDocs(postsQuery)
    
    if (querySnapshot.empty) {
      console.log('📭 No posts found to migrate.')
      return
    }

    console.log(`📊 Found ${querySnapshot.docs.length} posts to process`)
    
    const batch = writeBatch(db)
    const existingSlugs = new Set<string>()
    let updatedCount = 0
    let skippedCount = 0
    
    // First pass: collect existing slugs
    querySnapshot.docs.forEach(docSnap => {
      const data = docSnap.data()
      if (data.slug) {
        existingSlugs.add(data.slug)
      }
    })

    // Second pass: generate slugs for posts without them
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data()
      
      if (!data.slug) {
        if (!data.title) {
          console.warn(`⚠️  Post ${docSnap.id} has no title, skipping...`)
          skippedCount++
          continue
        }

        const slug = await generateUniqueSlug(data.title, existingSlugs)
        batch.update(doc(db, 'posts', docSnap.id), { slug })
        
        console.log(`✅ Post "${data.title}" -> slug: "${slug}"`)
        updatedCount++
      } else {
        console.log(`⏭️  Post "${data.title}" already has slug: "${data.slug}"`)
        skippedCount++
      }
    }
    
    if (updatedCount > 0) {
      console.log(`💾 Committing ${updatedCount} updates to database...`)
      await batch.commit()
      console.log('✨ Migration completed successfully!')
    } else {
      console.log('✨ No updates needed - all posts already have slugs!')
    }
    
    console.log(`📈 Summary:`)
    console.log(`   - Updated: ${updatedCount} posts`)
    console.log(`   - Skipped: ${skippedCount} posts`)
    console.log(`   - Total: ${querySnapshot.docs.length} posts`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migratePosts()
    .then(() => {
      console.log('🎉 Migration script completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error)
      process.exit(1)
    })
}

export { migratePosts }