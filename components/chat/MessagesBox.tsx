"use client"

import React, { useContext } from 'react'
import Message from './Message'
import ChatBoxContext from './contexts/ChatBox'

const MessagesBox = () => {
    const context = useContext(ChatBoxContext)
    return (
        <div className="mb-10 w-full mx-auto py-4">
            {
                context.messages.map((message, index) => (
                    <Message key={index} name={message.name} message={message.message} />
                ))
            }
        </div>

    )
}

export default MessagesBox
