import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bytesavy.com'
  
  // Define your static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/web',
    '/mobile',
    '/ai',
    '/consulting',
    '/development',
    '/support',
    '/portal',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }))
}