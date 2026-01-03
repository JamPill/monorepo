import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteState',
              type: 'select',
              defaultValue: 'construction',
              required: true,
              options: [
                { label: 'Online', value: 'online' },
                { label: 'Maintenance', value: 'maintenance' },
                { label: 'Construction', value: 'construction' },
              ],
              admin: {
                description: 'Current site state. "Maintenance" will block frontend access.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'appName',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'appNameExtended',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'contactUs',
              type: 'group',
              fields: [
                {
                  name: 'emails',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          admin: { width: '40%' },
                        },
                        {
                          name: 'email',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'phones',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          admin: { width: '40%' },
                        },
                        {
                          name: 'phone',
                          type: 'text',
                          required: true,
                          admin: { width: '60%' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Logos',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'logoSquareLight',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Square version (for light backgrounds)' },
                },
                {
                  name: 'logoSquareDark',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Square version (for dark backgrounds)' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoWideLight',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Wide version (for light backgrounds)' },
                },
                {
                  name: 'logoWideDark',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Wide version (for dark backgrounds)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Appearance (Colors)',
          fields: [
            {
              type: 'group',
              name: 'colors',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primary',
                      type: 'text',
                      defaultValue: '#000000',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'secondary',
                      type: 'text',
                      defaultValue: '#ffffff',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'tertiary',
                      type: 'text',
                      defaultValue: '#f0f0f0',
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'typography',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontTitle',
                      type: 'select',
                      defaultValue: 'Inter',
                      options: [
                        { label: 'Inter (Modern)', value: 'Inter' },
                        { label: 'Outfit (Geometric)', value: 'Outfit' },
                        { label: 'Gantari (Elegant)', value: 'Gantari' },
                        { label: 'Plus Jakarta Sans', value: 'PlusJakartaSans' },
                        { label: 'Montserrat', value: 'Montserrat' },
                        { label: 'Roboto (Standard)', value: 'Roboto' },
                      ],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontBody',
                      type: 'select',
                      defaultValue: 'Inter',
                      options: [
                        { label: 'Inter', value: 'Inter' },
                        { label: 'Outfit', value: 'Outfit' },
                        { label: 'Gantari', value: 'Gantari' },
                        { label: 'Plus Jakarta Sans', value: 'PlusJakartaSans' },
                        { label: 'Montserrat', value: 'Montserrat' },
                        { label: 'Roboto', value: 'Roboto' },
                      ],
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Accessibility',
          fields: [
            {
              name: 'accessibility',
              type: 'group',
              fields: [
                {
                  name: 'underlineLinks',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Always underline links',
                },
                {
                  name: 'accentFocus',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'High visibility focus on buttons and inputs',
                },
                {
                  name: 'highContrastBorders',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'High contrast borders on inputs',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
