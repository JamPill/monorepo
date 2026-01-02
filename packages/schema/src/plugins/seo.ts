import { seoPlugin } from '@payloadcms/plugin-seo'
import type { Plugin } from 'payload'

interface SeoPluginConfig {
  siteName: string
  baseUrl: string
  collections?: string[]
  uploadsCollection?: string
}

export const createSeoPlugin = ({
  siteName,
  baseUrl,
  collections = ['posts', 'pages'],
  uploadsCollection = 'media',
}: SeoPluginConfig): Plugin => {
  return seoPlugin({
    collections,
    uploadsCollection,
    tabbedUI: true,
    generateTitle: ({ doc }: any) => {
      return doc?.title ? `${doc.title} | ${siteName}` : siteName
    },
    generateDescription: ({ doc }: any) => {
      return doc?.excerpt || doc?.description || ''
    },
    generateURL: ({ doc, collectionSlug }: any) => {
      return `${baseUrl}/${collectionSlug}/${doc?.slug || ''}`
    },
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && ['title', 'description', 'image'].includes(field.name)) {
          return {
            ...field,
            localized: true,
          }
        }
        return field
      })
    },
  })
}
