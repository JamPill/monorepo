import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarClient } from '@repo/ui'
import { unstable_cache } from 'next/cache'
import React from 'react'

const getCachedHeader = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'header',
      depth: 1,
    })
  },
  ['header-global'],
  { tags: ['global_header'] },
)

export const Header = async () => {
  const headerData = await getCachedHeader()

  return <NavbarClient data={headerData} />
}
