import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { NavbarClient } from '@repo/ui'

export const Header = async () => {
  const payload = await getPayload({ config })

  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 1, // To populate the logo image and post references
  })

  return <NavbarClient data={headerData} />
}
