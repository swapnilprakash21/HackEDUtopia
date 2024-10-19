"use client"

import { faArrowUp, faMicrophone, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import validator from "validator";
import ListeningModal from "./ListeningModal";
import ChatBoxContext from './contexts/ChatBox';


const PromptInputBox = () => {
    const context = useContext(ChatBoxContext)
    const [prompt, setPrompt] = useState("")
    const router = useRouter()
    const [waitingForResponse, setWaitingForResponse] = useState(false)
    const [listening, setListening] = useState(false)
    const voiceInput = () => {
        if (listening) return
        setListening(true)
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'en-in';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();
        recognition.onresult = (event: any) => {
            const speechToText = event.results[0][0].transcript;
            setPrompt(speechToText)
        }
        recognition.onend = () => {
            setListening(false)
        }
    }
    const sendMessage = async () => {
        if (waitingForResponse) return
        if (prompt.trim() === "") return
        context.setMessages([...context.messages, { name: "You", message: prompt.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') }])
        setWaitingForResponse(true)
        setPrompt("")
        document.getElementById("prompt")!.style.height = "auto"
        try {
            let body = {}
            if (context.chatID !== "") {
                body = { prompt: prompt, chatID: context.chatID }
            }
            else {
                body = { prompt: prompt }
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/ai-chatbot/text-response`, body)
            if (res.data.success) {
                if (res.data.newChat) {
                    // router.push(`/chat/${res.data.chatID}`)
                    context.setChatID(res.data.chatID)
                    // return
                }
                if (res.data.suspended) {
                    router.push("/suspended")
                    return
                }
                const parsedMsg = markdownit({
                    html: false,
                    typographer: true,
                    linkify: true,
                    highlight: function (str: string, lang: string) {
                        if (lang && Object.keys(hljs.getLanguage(lang)!).length > 0) {
                            try {
                                return '<pre><code class="hljs">' +
                                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                                    '</code></pre>';
                            } catch (__) {
                                return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                            }
                        }
                        else {
                            return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                        }
                    },
                }).render(res.data.response)
                context.setMessages((prev) => [...prev, { name: "HackEDUTopia AI", message: parsedMsg }])
                setWaitingForResponse(false)
            }
            else {
                const parsedMsg = markdownit({
                    html: false,
                    typographer: true,
                    linkify: true,
                    highlight: function (str: string, lang: string) {
                        if (lang && Object.keys(hljs.getLanguage(lang)!).length > 0) {
                            try {
                                return '<pre><code class="hljs">' +
                                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                                    '</code></pre>';
                            } catch (__) {
                                return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                            }
                        }
                        else {
                            return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                        }
                    },
                }).render(res.data.response)
                context.setMessages((prev) => [...prev, { name: "HackEDUTopia AI", message: parsedMsg }])
                setWaitingForResponse(false)
            }
        } catch (error: any) {
            if (error.hasOwnProperty("response") && error.response.hasOwnProperty("data") && error.response.data.hasOwnProperty("response")) {
                if (error.response.data.suspended) {
                    router.push("/suspended")
                    return
                }
                const parsedMsg = markdownit({
                    html: false,
                    typographer: true,
                    linkify: true,
                    highlight: function (str: string, lang: string) {
                        if (lang && Object.keys(hljs.getLanguage(lang)!).length > 0) {
                            try {
                                return '<pre><code class="hljs">' +
                                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                                    '</code></pre>';
                            } catch (__) {
                                return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                            }
                        }
                        else {
                            return '<pre><code class="hljs">' + str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;') + '</code></pre>';
                        }
                    },
                }).render(error.response.data.response)
                context.setMessages((prev) => [...prev, { name: "HackEDUTopia AI", message: parsedMsg }])
            }
            else {
                context.setMessages((prev) => [...prev, { name: "HackEDUTopia AI", message: "We apologize for the inconvenience. An unexpected error occurred on our end. Our team is working diligently to resolve the issue. Please try again shortly. If the problem persists, please contact our support team for further assistance." }])
            }
            setWaitingForResponse(false)
        }
    }
    return (
        <>
            <div className="sticky w-full box-border bottom-0 py-4 bg-white">
                <div className="w-full mx-auto">
                    <div className="flex flex-col items-center relative">
                        <textarea
                            placeholder="Enter your prompt here"
                            rows={1}
                            id="prompt"
                            className="w-full min-h-20 lg:min-h-[83px] resize-none px-4 lg:px-8 pr-16 py-4 rounded-t-xl placeholder:text-gray-600 focus:outline-none border border-gray-300 border-b-0 bg-slate-200 focus:bg-stone-200 max-h-40 peer"
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value)
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }}
                        />
                        <div className="bg-slate-200 peer-focus:bg-stone-200 border-b-[2.5px] border-b-transparent peer-focus:border-b-pink-700 rounded-b-xl w-full pb-2 right-5 px-3 flex items-center justify-end space-x-4 cursor-text" onClick={(e) => {
                            const textarea = document.getElementById("prompt") as HTMLTextAreaElement
                            textarea.focus()
                        }}>
                            <div className="bg-white hover:bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 cursor-pointer" onClick={voiceInput}>
                                <FontAwesomeIcon icon={faMicrophone} className="text-gray-900 text-lg" />
                            </div>
                            <button
                                type="submit"
                                className="bg-pink-700 disabled:opacity-75 disabled:cursor-not-allowed py-2 px-3 rounded-lg"
                                onClick={() => sendMessage()}
                                disabled={waitingForResponse || validator.isEmpty(prompt.trim())}
                            >
                                {waitingForResponse ? <FontAwesomeIcon icon={faSpinner} className="text-white text-lg animate-spin" /> : <FontAwesomeIcon icon={faArrowUp} className="text-white text-lg" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                listening && <ListeningModal />
            }
        </>
    )
}

export default PromptInputBox
