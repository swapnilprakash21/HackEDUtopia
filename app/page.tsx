import Footer from '@/components/Footer'
import Features from '@/components/home/Features'
import HeroSection from '@/components/home/Hero'
import PersonalizedExp from '@/components/home/PersonalizedExp'
import WellBeingSection from '@/components/home/WellBeingSection'
import Navbar from '@/components/Navbar'
import verifyLogin from '@/lib/verifyLogin'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: `Smart Education - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Reimagine learning with creative tech solutions that make education exciting and effortless.'
}

const HomePage = async () => {
  const login = await verifyLogin()
  if(login){
    redirect("/dashboard")
  }
  return (
    <>
      <Navbar />
      <HeroSection />
      <PersonalizedExp />
      <Features />
      <WellBeingSection />
      <Footer />
    </>
  )
}

export default HomePage
