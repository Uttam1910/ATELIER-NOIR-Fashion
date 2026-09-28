import { useEffect } from 'react'
import { pageTitle } from '../config/fashion'

/** Sets the document title and meta description for the current route. */
export function useDocumentMeta(title: string | undefined, description: string) {
  useEffect(() => {
    document.title = pageTitle(title)
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
