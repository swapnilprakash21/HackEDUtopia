/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50 relative">
            {/* Decorative Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="w-96 h-96 bg-violet-300 rounded-full blur-3xl opacity-30 -top-20 -left-40"></div>
                <div className="w-72 h-72 bg-pink-200 rounded-full blur-2xl opacity-20 bottom-0 -right-40"></div>
            </div>

            <div className="container mx-auto relative z-10 px-5 lg:px-0">
                {/* Heading */}
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-16">
                    Our Exciting <span className="text-violet-600">Features</span>
                </h2>

                {/* Features Flexbox Layout */}
                <div className="flex flex-col md:flex-row justify-center items-stretch flex-wrap gap-12">
                    {/* Feature Card 1 */}
                    <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                        <img src="/images/gamified-learning.webp" alt="Gamified Learning" className="h-52 w-full object-cover rounded-lg mb-6" />
                        <h3 className="text-2xl font-bold text-blue-500 mb-4">Gamified Learning</h3>
                        <p className="text-gray-600">
                            Earn badges and points as you progress through interactive lessons, turning learning into an adventure.
                        </p>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                        <img src="/images/ai-chatbot-home.png" alt="AI-Powered Chatbot" className="h-52 w-full object-cover rounded-lg mb-6" />
                        <h3 className="text-2xl font-bold text-green-500 mb-4">AI-Powered Chatbot</h3>
                        <p className="text-gray-600">
                            Get personalized assistance from our AI tutor, guiding you through your learning journey with intelligent support.
                        </p>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                        <img src="/images/educational-video.jpg" alt="VR Videos" className="h-52 w-full object-cover rounded-lg mb-6" />
                        <h3 className="text-2xl font-bold text-purple-500 mb-4">Educational Videos</h3>
                        <p className="text-gray-600">
                            Experience immersive Educatioal lessons that make learning more engaging and exciting through interactive videos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
