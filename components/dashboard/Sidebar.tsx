"use client"
import Link from 'next/link'
import React from 'react'

interface SidebarItemsType {
    title: string,
    page: string,
    url: string
}


interface Props {
    page: string
}

const Sidebar = (props: Props) => {
    const sideBarItems: SidebarItemsType[] = [
        {
            title: "Dashboard",
            page: 'dashboard',
            url: '/dashboard'
        },
        {
            title: "Quizzes",
            page: 'quizzes',
            url: '/dashboard/quizzes'
        },
        {
            title: "Edu Games",
            page: 'games',
            url: '/dashboard/games'
        },
        {
            title: "Educational Videos",
            page: 'edu-videos',
            url: '/dashboard/edu-videos'
        },
        {
            title: "AI Chatbot",
            page: 'ai-chatbot',
            url: '/dashboard/ai-chatbot'
        },
    ]
    return (
        <div className="w-80 bg-gray-50 border-r h-full fixed py-6 px-4">
            {
                sideBarItems.map((element) => {
                    return <div key={element.page}>
                        <Link href={element.url}>
                            <div className={`hover:bg-white my-3 py-5 px-4 hover:text-purple-700 border-2 hover:border-purple-700 rounded-lg font-semibold text-lg cursor-pointer shadow-lg ${props.page === element.page ? 'bg-purple-600 text-white border-purple-600' : 'border-white'}`}>
                                {element.title}
                            </div>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default Sidebar
