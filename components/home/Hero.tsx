/* eslint-disable @next/next/no-img-element */
"use client"

import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-r from-[#ef7534] via-pink-500 to-sky-600 text-white py-16 px-4 lg:px-8">
            <div className="container mx-auto flex flex-col lg:flex-row items-center lg:space-x-10 space-y-10 lg:space-y-0">
                {/* Text Content */}
                <div className="lg:w-3/5 text-center lg:text-left space-y-8">
                    <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
                        {`${process.env.NEXT_PUBLIC_APP_NAME}`}
                    </h1>
                    <p className="text-base lg:text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0">
                        {`${process.env.NEXT_PUBLIC_APP_NAME}`} is a revolutionary platform offering a unique approach to education. Combining interactive quizzes, AI technology, engaging games, and immersive VR experiences, it transforms learning into an exciting and personalized adventure. Explore a vast array of subjects in ways that challenge and inspire.
                    </p>
                    <div className="mt-10">
                        <Link href={"/account/sign-up"} className="bg-white text-[#ef7534] font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                            Get Started
                        </Link>
                    </div>
                </div>
                
                {/* Image Section */}
                <div className="lg:w-2/5 relative">
                    <div className="relative w-full h-full">
                        {/* Image */}
                        <img src="/images/hero-img.png" alt="Education Platform" className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out" />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-lg"></div>
                    </div>
                </div>
            </div>

            {/* Background Shapes */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                {/* Floating shapes */}
                <div className="w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-50 -top-20 -left-20 absolute animate-pulse"></div>
                <div className="w-72 h-72 bg-sky-400 rounded-full blur-3xl opacity-50 bottom-10 right-10 absolute animate-pulse"></div>
            </div>
        </div>
    )
}

export default HeroSection