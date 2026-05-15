import { useEffect } from 'react'

type MetaOptions = {
  title: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
}

function setMeta(property: string, content: string) {
  const selector = property.startsWith('og:')
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    if (property.startsWith('og:')) {
      el.setAttribute('property', property)
    } else {
      el.setAttribute('name', property)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta({ title, description, ogTitle, ogDescription, ogUrl }: MetaOptions) {
  useEffect(() => {
    document.title = title
    if (description) setMeta('description', description)
    if (ogTitle) setMeta('og:title', ogTitle)
    if (ogDescription) setMeta('og:description', ogDescription)
    if (ogUrl) setMeta('og:url', ogUrl)
  }, [title, description, ogTitle, ogDescription, ogUrl])
}
