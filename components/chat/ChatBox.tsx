"use client"

import { useState } from 'react'
import MessagesBox from './MessagesBox'
import PromptInputBox from './PromptInputBox'
import ChatBoxContext from './contexts/ChatBox'
import MessageType from './interfaces/MessageType'

interface Props {
    user_name: string,
    fetchChatHistory: boolean,
    chatID?: string
}

const ChatBox = (props: Props) => {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [chatID, setChatID] = useState<string>(props.chatID || "")
    const contextValues = {
        messages,
        setMessages,
        chatID: chatID,
        setChatID
    }
    return (
        <>
            <ChatBoxContext.Provider value={contextValues}>

                <div className="flex-grow min-h-screen">
                    {
                        props.chatID == undefined && messages.length == 0 && <div className="lg:py-10 lg:px-36">
                            <div className="lg:py-3 px-3 mt-6">
                                <div className="container">
                                    <h2 className="py-4 bg-gradient-to-r from-pink-400 to-[#3CBAF7] text-transparent bg-clip-text text-5xl lg:text-6xl font-bold">{`Hello, ${props.user_name.split(" ")[0]}`}</h2>
                                    <h3 className="text-gray-400 py-10 font-bold text-2xl lg:text-3xl">
                                        {`Welcome to ${process.env.NEXT_PUBLIC_APP_NAME} Chat. You can ask me anything. I am here to help you.`}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-3 px-4">
                                <div className="border-2 border-pink-500 p-3 rounded-md">
                                    <span className="font-bold text-pink-700">Important Notice: </span>
                                    <span className="text-base text-gray-600">We take the safety and well-being of our users seriously. Any misuse of this chatbot, including but not limited to illegal, abusive, or inappropriate prompts, will result in <strong className="font-bold">immediate suspension of your account</strong>. We uphold strict standards to maintain a positive environment. Thank you for your understanding and cooperation.</span>
                                </div>
                            </div>
                        </div>
                    }
                    <MessagesBox />
                </div>
                <PromptInputBox />
            </ChatBoxContext.Provider>
        </>
    )
}

export default ChatBox
