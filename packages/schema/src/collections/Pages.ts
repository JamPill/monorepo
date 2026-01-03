import type { CollectionConfig } from 'payload'
import { revalidateCollection } from '../hooks/revalidate'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  hooks: {
    afterChange: [revalidateCollection((doc) => `page_${doc.slug}`)],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief summary for previews and SEO.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
          },
        ],
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal editorial notes.',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Hero, Content],
      required: true,
      localized: true,
    },
  ],
}
