import { useEffect, useState, useCallback } from 'react'

/**
 * Custom hook scroll manager
 * Tracks current coordinates, progress percentage, scrolling direction,
 * and maintains which section is currently intersected and active.
 */
export default function useScroll(offsetMargin = '-20% 0px -60% 0px') {
  const [activeSection, setActiveSection] = useState('')
  const [scrollData, setScrollData] = useState({
    y: 0,
    direction: 'down',
    progress: 0,
  })

  // Handles smooth scrolls to section elements
  const scrollToSection = useCallback((sectionId, offset = 0) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0

      setScrollData({
        y: currentScrollY,
        direction,
        progress,
      })

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-tracks which section is active via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: offsetMargin, // Centered focus boundary
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Query for any HTML5 <section> tag having an ID attribute
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [offsetMargin])

  return {
    ...scrollData,
    activeSection,
    scrollToSection,
  }
}
