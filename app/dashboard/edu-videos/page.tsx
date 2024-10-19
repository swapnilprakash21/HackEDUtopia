import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'
import Resources from './Resources'
import Footer from '@/components/Footer'

const VRVideos = () => {
  return (
    <>
      <Sidebar page='edu-videos' />
      <div className="ml-80">
        <Resources />
        <Footer />
      </div>
    </>
  )
}

export default VRVideos
