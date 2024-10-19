"use client"

/* eslint-disable @next/next/no-img-element */
import { CardContent, Typography } from '@mui/material'
import AOS from 'aos'
import "aos/dist/aos.css"
import { useEffect, useState } from 'react'

const Resources = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const [modalIndex, setModalIndex] = useState<number>(0)

    const resources = [
        {
            title: "Permutation & Combinations FULL CHAPTER | Class 11th Maths | Arjuna JEE",
            description: "In this video, Tarun sir will discuss the chapter - Permutation & Combinations for Class 11th Maths. This video is very helpful for students preparing for JEE Exam. Watch the video till the end to understand the concept of Permutation & Combinations.",
            image: "https://i.ytimg.com/vi/UoJh42eQU8I/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAuln3byVlFkNB3s-byeR0-o-erpA",
            url: "UoJh42eQU8I"
        },
        {
            title: "Complete ROTATIONAL MOTION in 60 Minutes | Class 11th NEET",
            description: "In this video, Er. MR Sir will discuss the complete chapter of Rotational Motion for Class 11th NEET. This video is very helpful for students preparing for NEET Exam. Watch the video till the end to understand the concept of Rotational Motion.",
            image: "https://i.ytimg.com/vi/VqVZA0IE4uQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDnfchCnf0ZGk1LeZ5_uw8JhK0ZZw",
            url: "VqVZA0IE4uQ"
        },
        {
            title: "CHEMICAL REACTIONS AND EQUATIONS in 30 Minutes || Mind Map Series for Class 10th",
            description: "In this video, ma'am will discuss the complete chapter of Chemical Reactions and Equations for Class 10th. This video is very helpful for students preparing for CBSE Board Exam. Watch the video till the end to understand the concept of Chemical Reactions and Equations.",
            image: "https://i.ytimg.com/vi/dq46IAXkMok/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDBz3rsb7IOU3BueY28kTQ8LacBEQ",
            url: "dq46IAXkMok"
        },
        {
            title: "CHEMICAL BONDING in 85 Minutes || Full Chapter Revision || Class 11th JEE",
            description: "In this video, Om sir will discuss the complete chapter of Chemical Bonding for Class 11th JEE. This video is very helpful for students preparing for JEE Exam. Watch the video till the end to understand the concept of Chemical Bonding.",
            image: "https://i.ytimg.com/vi/Dk-ZqQ-bfy4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBkzpPQnrY8qND7OUyC9sUNlebRag",
            url: "gcx8-VOoegg"
        },
    ]

    useEffect(() => {
        AOS.init({
            duration: 1200,
            disable: 'mobile'
        })
    }, [])

    useEffect(() => {
        document.body.style.overflow = modalOpened ? "hidden" : "auto"
    }, [modalOpened])

    const closeModal = () => {
        setModalOpened(false)
        setModalIndex(0)
    }

    const openModal = (index: number) => {
        setModalOpened(true)
        setModalIndex(index)
    }

    return (
        <>
            <title>Educational Videos - {process.env.NEXT_PUBLIC_APP_NAME}</title>
            <div className="px-2 lg:px-6 py-3 lg:py-8 bg-gray-100 min-h-screen">
                <div className="text-4xl font-bold text-gray-600 py-5">
                    <h1>Educational Videos</h1>
                </div>
                <div className="flex flex-wrap md:space-x-2 lg:space-x-8 space-y-6 justify-center items-center">
                    {
                        resources.map((res, index) => (
                            <div className="border shadow-lg rounded-lg px-0 py-0 max-w-xs lg:max-w-sm bg-white h-[38rem] w-96 relative" data-aos="fade-right" key={index}>
                                <div className="flex justify-center items-center pb-4">
                                    <img src={res.image} alt={res.title} className="h-44 lg:h-60 w-full rounded-t-lg" />
                                </div>
                                <CardContent>
                                    <div className="py-2 px-5">
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="font-semibold text-gray-800">{res.title}</span>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">{res.description}</Typography>
                                        <div className="mt-6">
                                            <button onClick={() => openModal(index)} className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full mt-4 absolute bottom-6">
                                                Watch
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        ))
                    }
                </div>
                {
                    modalOpened && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
                            <div className="flex justify-center h-full w-full">
                                <div className="bg-white rounded-lg my-10 shadow-lg w-11/12 md:w-3/4 lg:w-3/4 h-11/12 py-2 overflow-hidden">
                                    <div className="flex justify-between items-center p-4">
                                        <div className="text-lg md:text-3xl font-semibold">
                                            <span>{resources[modalIndex].title}</span>
                                        </div>
                                        <button onClick={closeModal} className="text-4xl font-bold text-gray-600 hover:text-gray-800">&times;</button>
                                    </div>
                                    <div className="flex justify-center items-center h-5/6 py-2">
                                        <iframe
                                            className="h-full box-border w-full bg-[url('/images/loading.gif')] bg-center bg-no-repeat"
                                            src={`https://youtube.com/embed/${resources[modalIndex].url}?cc_load_policy=1`}
                                            title={resources[modalIndex].title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ backgroundSize: "2.7rem" }}
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Resources