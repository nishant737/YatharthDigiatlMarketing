import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

function freezeTransitions() {
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = useCallback(() => {
    freezeTransitions()
    setDark(d => !d)
    // Re-enable after browser paints the new theme
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
