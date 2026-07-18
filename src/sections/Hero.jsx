import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Hero section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Hero = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="hero" ref={ref} {...props}>
      <header className="hero-content">
        <h1>Hero Section</h1>
        <p>Structural blueprint content placeholder</p>
      </header>
    </SectionWrapper>
  )
})

Hero.displayName = 'Hero'
export default Hero
