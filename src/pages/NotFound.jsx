import React from 'react'
import MainLayout from '../components/layout/MainLayout'

/**
 * Reusable NotFound page shell
 */
export default function NotFound() {
  return (
    <MainLayout>
      <div className="not-found-content" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </MainLayout>
  )
}
