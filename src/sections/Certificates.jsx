import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Certificates section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Certificates = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="certificates" ref={ref} {...props}>
      <div className="certificates-content">
        <h2>Certificates Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

Certificates.displayName = 'Certificates'
export default Certificates
