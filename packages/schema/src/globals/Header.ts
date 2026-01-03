import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal('global_header')],
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                {
                  label: 'Internal',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
              defaultValue: 'reference',
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['posts'], // We will add 'pages' later if needed
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
            },
          ],
        },
      ],
    },
  ],
}
