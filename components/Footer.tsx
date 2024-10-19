/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-4">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold text-white">
                    {`${process.env.NEXT_PUBLIC_APP_NAME}`}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    &copy; {new Date().getFullYear()} {`${process.env.NEXT_PUBLIC_APP_NAME}`}. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
