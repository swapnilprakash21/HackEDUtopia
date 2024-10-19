/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'

const WellBeingSection = () => {
    return (
        <section id="wellbeing" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
            {/* Section Heading */}
            <div className="container mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-10">
                    Enhance Your Learning with <span className="text-green-600">Physical & Mental Well-Being</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-16">
                    Improve focus, retention, and overall effectiveness by maintaining a healthy body and mind.
                    Explore how physical and mental well-being can boost your learning experience.
                </p>
            </div>

            {/* Flexbox Layout for Features */}
            <div className="flex flex-col md:flex-row justify-center items-stretch flex-wrap gap-12 px-5 lg:px-0">
                {/* Physical Well-Being Card */}
                <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                    <img src="/images/PhysicalWellBeing.jpg" alt="Physical Well-Being" className="h-72 w-full object-cover rounded-lg mb-6" />
                    <h3 className="text-2xl font-bold text-blue-500 mb-4">Physical Well-Being</h3>
                    <p className="text-gray-600">
                        Engage in regular physical activity to boost your cognitive function and concentration. Short breaks with stretching or exercise can enhance memory retention and learning speed.
                    </p>
                </div>

                {/* Mental Well-Being Card */}
                <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                    <img src="/images/mental-well-being.png" alt="Mental Well-Being" className="h-72 w-full object-cover rounded-lg mb-6" />
                    <h3 className="text-2xl font-bold text-green-500 mb-4">Mental Well-Being</h3>
                    <p className="text-gray-600">
                        Practice mindfulness and meditation to reduce stress and improve focus. Mental health is key to sustaining motivation and absorbing new information effectively.
                    </p>
                </div>

                {/* Nutrition and Sleep Card */}
                <div className="flex-1 max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center">
                    <img src="/images/sleep.jpg" alt="Nutrition and Sleep" className="h-72 w-full object-cover rounded-lg mb-6" />
                    <h3 className="text-2xl font-bold text-purple-500 mb-4">Nutrition & Sleep</h3>
                    <p className="text-gray-600">
                        A balanced diet and proper sleep are essential for a healthy brain. Nutrition provides the energy you need to stay sharp, while sleep aids memory consolidation.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default WellBeingSection