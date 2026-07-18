import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Projects section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Projects = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="projects" ref={ref} {...props}>
      <div className="projects-content">
        <h2>Projects Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

Projects.displayName = 'Projects'
export default Projects
