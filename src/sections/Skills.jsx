import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Skills section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Skills = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="skills" ref={ref} {...props}>
      <div className="skills-content">
        <h2>Skills Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

Skills.displayName = 'Skills'
export default Skills
