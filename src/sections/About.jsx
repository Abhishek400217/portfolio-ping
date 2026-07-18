import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable About section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const About = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="about" ref={ref} {...props}>
      <div className="about-content">
        <h2>About Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

About.displayName = 'About'
export default About
