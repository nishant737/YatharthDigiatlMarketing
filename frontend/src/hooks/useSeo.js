import { useEffect } from 'react'
import { SITE } from '../data/site'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) || []
    if (key) el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Keeps <title>, description, canonical and social tags in sync on client-side
// navigation. The first load of every route already has these in its
// prerendered HTML (scripts/prerender.mjs); this only matters after in-app navigation.
export function useSeo({ title, description, path }) {
  useEffect(() => {
    if (!title) return
    const url = SITE.url + path
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description, path])
}
