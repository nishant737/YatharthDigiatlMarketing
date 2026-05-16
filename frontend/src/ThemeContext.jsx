import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

function freezeTransitions() {
  if (document.getElementById('__theme-freeze__')) return
  const style = document.createElement('style')
  style.id = '__theme-freeze__'
  style.textContent = `*, *::before, *::after { transition: none !important; animation-duration: 0.001ms !important; }`
  document.head.appendChild(style)
}
function thawTransitions() {
  const el = document.getElementById('__theme-freeze__')
  if (el) el.remove()
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  // Set initial data-theme synchronously on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const toggle = useCallback(() => {
    freezeTransitions()
    setDark(d => {
      const newDark = !d
      // Update CSS vars synchronously in same microtask as state change
      // so both inline styles and CSS vars flip in one paint
      document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light')
      return newDark
    })
    // Unfreeze after two rAFs (two paint frames) to ensure everything settled
    requestAnimationFrame(() => requestAnimationFrame(() => {
      thawTransitions()
    }))
  }, [])

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
