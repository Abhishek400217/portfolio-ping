import React, { forwardRef } from 'react'
import SectionWrapper from '../components/layout/SectionWrapper'

/**
 * Reusable Contact section shell.
 * Configured with forwardRef and lazy-load/intersection ready attributes.
 */
const Contact = forwardRef((props, ref) => {
  return (
    <SectionWrapper id="contact" ref={ref} {...props}>
      <div className="contact-content">
        <h2>Contact Section</h2>
        <p>Structural blueprint content placeholder</p>
      </div>
    </SectionWrapper>
  )
})

Contact.displayName = 'Contact'
export default Contact
