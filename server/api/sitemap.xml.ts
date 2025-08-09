export default defineEventHandler(async (event) => {
  // Get the site URL from the runtime config
  const siteUrl = 'https://nethmalgunawardhana.vercel.app'
  
  // Define your static pages
  const staticPages = [
    {
      url: '/',
      changefreq: 'monthly',
      priority: '1.0',
      lastmod: new Date().toISOString()
    },
    {
      url: '/dashboard',
      changefreq: 'weekly',
      priority: '0.5',
      lastmod: new Date().toISOString()
    }
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Set the appropriate headers
  setHeader(event, 'content-type', 'application/xml')
  
  return sitemap
})
