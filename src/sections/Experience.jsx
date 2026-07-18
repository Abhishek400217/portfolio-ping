import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Experience section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Experience = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="experience" ref={ref} {...props}>
      <div className="experience-content">
        <h2>Experience Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

Experience.displayName = 'Experience'
export default Experience
