import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import config from '@payload-config'

export const alt = 'Apple Icon'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default async function Icon() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const favicon = settings.logoSquareLight

  if (!favicon || typeof favicon === 'number') {
    return new ImageResponse(
      <div
        style={{
          fontSize: 120,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        J
      </div>,
      {
        ...size,
      },
    )
  }

  return new ImageResponse(
    <img
      src={favicon.url || ''}
      alt={favicon.alt || 'Apple Icon'}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />,
    {
      ...size,
    },
  )
}
