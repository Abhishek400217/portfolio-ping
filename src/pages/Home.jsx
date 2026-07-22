import React, { Suspense, lazy, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import PageContainer from '../components/layout/PageContainer'
import { RobotProvider } from '../context/RobotContext.jsx'
import Intro from '../components/intro/Intro.jsx'
import { usePing } from '../hooks/usePing.js'

// Lazy-loaded section components for optimized bundle performance
const Hero = lazy(() => import('../sections/Hero'))
const About = lazy(() => import('../sections/About'))
const Skills = lazy(() => import('../sections/Skills'))
const Experience = lazy(() => import('../sections/Experience'))
const Projects = lazy(() => import('../sections/Projects'))
const Certificates = lazy(() => import('../sections/Certificates'))
const GitHub = lazy(() => import('../sections/GitHub'))
const Contact = lazy(() => import('../sections/Contact'))

function HomeContent() {
  const mascot = usePing();
  const [isHeroRevealing, setIsHeroRevealing] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setIsIntroComplete(true);
    if (mascot && mascot.completeIntro) {
      mascot.completeIntro();
    }
  };

  return (
    <>
      {/* 1. Portfolio Shell mounts & fades in while Ping flies */}
      {(isHeroRevealing || isIntroComplete) && (
        <div style={{ opacity: 1, transition: 'opacity 0.8s ease' }}>
          <MainLayout>
            <PageContainer>
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
        </div>
      )}

      {/* 2. Cinematic Intro unmounts completely when flight finishes */}
      {!isIntroComplete && (
        <Intro 
          onStartHero={() => setIsHeroRevealing(true)} 
          onComplete={handleIntroComplete} 
        />
      )}
    </>
  );
}

/**
 * Single-Page Portfolio Home Layout
 * Wraps HomeContent inside RobotProvider.
 */
export default function Home() {
  return (
    <RobotProvider>
      <HomeContent />
    </RobotProvider>
  );
}
