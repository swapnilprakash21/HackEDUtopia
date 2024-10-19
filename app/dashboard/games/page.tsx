import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'
import GamesMain from './GamesMain'
import Footer from '@/components/Footer'

const Games = () => {
  return (
    <>
      <Sidebar page='games' />
      <div className="ml-80">
        <GamesMain />
        <Footer />
      </div>
    </>
  )
}

export default Games
