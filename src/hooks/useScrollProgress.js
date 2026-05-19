import { useEffect, useRef, useState } from 'react'

/**
 * Returns a progress value [0, 1] based on how far
 * the element has been scrolled through the viewport.
 */
export function useScrollProgress(options = {}) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const winH = window.innerHeight
      // start when bottom of element enters viewport, end when top exits
      const total = rect.height + winH
      const passed = winH - rect.top
      setProgress(Math.min(1, Math.max(0, passed / total)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return [ref, progress]
}

/**
 * Returns global scroll progress [0, 1] for the whole page.
 */
export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
