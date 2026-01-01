import { nextConfig } from '@repo/eslint-config/next.mjs'

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['.next/'],
  },
]

export default eslintConfig
