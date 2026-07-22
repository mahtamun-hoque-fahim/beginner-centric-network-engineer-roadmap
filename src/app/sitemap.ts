import type { MetadataRoute } from 'next'
import { getCurriculum } from '@/lib/curriculum'

// Same reasoning as curriculum/page.tsx: fetch per-request, not at build
// time, so the build never depends on DB availability.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const phases = await getCurriculum()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...phases.map((phase) => ({
      url: `${baseUrl}/curriculum/${phase.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
