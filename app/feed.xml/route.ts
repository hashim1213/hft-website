import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface Post {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: any;
  status?: 'draft' | 'published';
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssItem(post: Post, baseUrl: string): string {
  const postUrl = post.slug
    ? `${baseUrl}/blog/${post.slug}`
    : `${baseUrl}/blog/${post.id}`;

  const pubDate = post.createdAt?.toDate
    ? new Date(post.createdAt.toDate()).toUTCString()
    : new Date(post.createdAt).toUTCString();

  const categories = post.tags?.map(tag =>
    `    <category>${escapeXml(tag)}</category>`
  ).join('\n') || '';

  const image = post.imageUrl
    ? `    <enclosure url="${escapeXml(post.imageUrl)}" type="image/jpeg" />`
    : '';

  // Create a clean description from content (limit to 500 chars)
  const description = post.excerpt || post.content.substring(0, 500).replace(/<[^>]*>/g, '');

  return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <description>${escapeXml(description)}</description>
    <pubDate>${pubDate}</pubDate>
    <author>${escapeXml(post.author)}</author>
${categories}
${image}
  </item>`;
}

export async function GET() {
  try {
    const baseUrl = 'https://bytesavy.com';

    // Initialize Firebase
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    // Fetch all posts from Firestore (we'll filter and sort in code to avoid needing a composite index)
    const postsQuery = query(
      collection(db, 'posts')
    );

    const postsSnapshot = await getDocs(postsQuery);

    // Filter for published posts and sort by date in JavaScript
    const posts: Post[] = postsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Post))
      .filter(post => post.status === 'published')
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 50); // Limit to most recent 50 posts

    // Get the most recent post date for lastBuildDate
    const lastBuildDate = posts.length > 0 && posts[0].createdAt?.toDate
      ? new Date(posts[0].createdAt.toDate()).toUTCString()
      : new Date().toUTCString();

    // Generate RSS items
    const rssItems = posts.map(post => generateRssItem(post, baseUrl)).join('\n');

    // Generate complete RSS feed
    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bytesavy Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights, tutorials, and thought leadership on software development, AI, and technology innovation from Bytesavy.</description>
    <language>en-ca</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Bytesavy Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
