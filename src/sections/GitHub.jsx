import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable GitHub section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const GitHub = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="github" ref={ref} {...props}>
      <div className="github-content">
        <h2>GitHub Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

GitHub.displayName = 'GitHub'
export default GitHub
