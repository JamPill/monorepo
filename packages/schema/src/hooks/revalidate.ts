import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateCollection = (
  tagOrFn: string | ((doc: any) => string),
): CollectionAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    const tag = typeof tagOrFn === 'function' ? tagOrFn(doc) : tagOrFn
    payload.logger.info(`Revalidating collection with tag: ${tag}`)
    revalidateTag(tag)
    return doc
  }
}

export const revalidateGlobal = (
  tagOrFn: string | ((doc: any) => string),
): GlobalAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    const tag = typeof tagOrFn === 'function' ? tagOrFn(doc) : tagOrFn
    payload.logger.info(`Revalidating global with tag: ${tag}`)
    revalidateTag(tag)
    return doc
  }
}
