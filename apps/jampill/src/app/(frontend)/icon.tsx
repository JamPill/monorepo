import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import config from '@payload-config'

// Image metadata
export const alt = 'Favicon'
export const dynamic = 'force-dynamic'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const favicon = settings.logoSquareLight

  if (!favicon || typeof favicon === 'number') {
    // Return a default simple icon if none is uploaded
    return new ImageResponse(
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
        }}
      >
        J
      </div>,
      {
        ...size,
      },
    )
  }

  // If we have an image, we use it
  return new ImageResponse(
    <img
      src={favicon.url || ''}
      alt={favicon.alt || 'Icon'}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '20%',
        objectFit: 'cover',
      }}
    />,
    {
      ...size,
    },
  )
}
