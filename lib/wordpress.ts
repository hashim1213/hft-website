export type WordPressPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>
    author?: Array<{ name: string }>
    "wp:term"?: Array<Array<{ name: string; slug: string }>>
  }
}

const API_URL = process.env.WORDPRESS_API_URL?.replace(/\/$/, "")

export async function getPosts(limit = 3): Promise<WordPressPost[]> {
  if (!API_URL) return []
  try {
    const response = await fetch(`${API_URL}/posts?_embed&per_page=${limit}`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) return []
    return response.json()
  } catch {
    return []
  }
}

export async function getAllPosts(): Promise<WordPressPost[]> {
  if (!API_URL) return []
  try {
    const firstResponse = await fetch(`${API_URL}/posts?_embed&per_page=100&page=1`, {
      next: { revalidate: 60 },
    })
    if (!firstResponse.ok) return []

    const firstPage: WordPressPost[] = await firstResponse.json()
    const totalPages = Number(firstResponse.headers.get("X-WP-TotalPages") || "1")
    if (totalPages <= 1) return firstPage

    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map(async page => {
        const response = await fetch(`${API_URL}/posts?_embed&per_page=100&page=${page}`, {
          next: { revalidate: 60 },
        })
        return response.ok ? response.json() as Promise<WordPressPost[]> : []
      })
    )

    return firstPage.concat(...remainingPages)
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  if (!API_URL) return null
  try {
    const response = await fetch(`${API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) return null
    const posts: WordPressPost[] = await response.json()
    return posts[0] || null
  } catch {
    return null
  }
}

export function plainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;/g, "’").replace(/\s+/g, " ").trim()
}

export function featuredImage(post: WordPressPost) {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
}
