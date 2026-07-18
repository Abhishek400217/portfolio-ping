import React, { Suspense, lazy } from 'react'
import MainLayout from '../components/layout/MainLayout'
import PageContainer from '../components/layout/PageContainer'

// Lazy-loaded section components for optimized bundle performance
const Hero = lazy(() => import('../sections/Hero'))
const About = lazy(() => import('../sections/About'))
const Skills = lazy(() => import('../sections/Skills'))
const Experience = lazy(() => import('../sections/Experience'))
const Projects = lazy(() => import('../sections/Projects'))
const Certificates = lazy(() => import('../sections/Certificates'))
const GitHub = lazy(() => import('../sections/GitHub'))
const Contact = lazy(() => import('../sections/Contact'))

/**
 * Single-Page Portfolio Home Layout
 * Hooks up the lazy loading boundary blocks and orchestrates section renders.
 */
export default function Home() {
  return (
    <MainLayout>
      <PageContainer>
        {/* Lazy loading boundaries */}
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading section...</div>}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <GitHub />
          <Contact />
        </Suspense>
      </PageContainer>
    </MainLayout>
  )
}
