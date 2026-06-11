import { useState, useEffect } from 'react'

/**
 * Hook to detect when portfolio sections are in view
 * and control navbar visibility accordingly
 */
export function useNavbarVisibility() {
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false)

  useEffect(() => {
    // Sections where navbar should hide
    const portfolioSections = ['our-work', 'craft']

    // Create intersection observer to detect when sections are in view
    const observers = []

    portfolioSections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If any portfolio section is more than 10% visible, hide navbar
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              setShouldHideNavbar(true)
            } else if (entry.intersectionRatio < 0.05) {
              // Only show navbar when we're clearly out of the section
              setShouldHideNavbar(false)
            }
          })
        },
        {
          threshold: [0.05, 0.1, 0.5], // Trigger at 5%, 10%, and 50% visibility
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach(obs => obs.disconnect())
    }
  }, [])

  return shouldHideNavbar
}
