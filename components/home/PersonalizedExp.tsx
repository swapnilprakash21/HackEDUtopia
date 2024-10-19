/* eslint-disable @next/next/no-img-element */
"use client"

import Link from 'next/link'
import React from 'react'

const PersonalizedExp = () => {
    return (
        <section className="relative bg-white py-16 lg:py-24">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-purple-50 to-pink-100 opacity-50 pointer-events-none"></div>
            <div className="container mx-auto relative z-10 ">
                {/* Content Container */}
                <div className="flex flex-col lg:flex-row items-center justify-start gap-12 ml-10">
                    
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
                            Discover Your <span className="text-violet-600">Personalized Learning Experience</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Our carefully designed quiz is crafted to understand your unique interests and learning style. Take the quiz to receive tailored recommendations that will enhance your learning journey and make it both engaging and effective.
                        </p>
                        <Link href="/account/login" className="inline-block bg-violet-600 text-white text-lg font-medium py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300">
                                Take the Quiz Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PersonalizedExp
