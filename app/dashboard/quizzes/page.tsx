import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'
import QuizMain from './QuizMain'
import Footer from '@/components/Footer'

const Quizzes = () => {
  return (
    <>
      <Sidebar page='quizzes' />
      <div className="ml-80">
        <QuizMain />
        <Footer />
      </div>
    </>
  )
}

export default Quizzes
