"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DashboardNavbar = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`, {})
            if (res.status === 200) {
                window.location.href = "/account/login"
            }
        } catch (error: any) {
            console.error(error)
            alert("Something went wrong")
        }
    }
    return (
        <nav className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 shadow-lg flex items-center justify-between sticky top-0 left-0 z-40">
            {/* App Name */}
            <div className="text-2xl font-extrabold tracking-wide flex items-center">
                <span className="mr-2">🚀</span> {process.env.NEXT_PUBLIC_APP_NAME}
            </div>

            {/* Logout Button */}
            <button
                onClick={() => {
                    // Handle logout logic here
                   handleLogout()
                   router.push("/account/login")
                }}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                Logout
            </button>
        </nav>
    );
};

export default DashboardNavbar;
