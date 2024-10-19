import ironSessionConfig from "@/lib/iron-session/IronSessionConf";
import Session from "@/lib/iron-session/SessionInterface";
import verifyLogin from "@/lib/verifyLogin";
import connectDB from "@/middleware/DBConfig";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { EnhancedGenerateContentResponse, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, HarmProbability, SafetyRating } from "@google/generative-ai";
import crypto from "crypto";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export const maxDuration = 45; // This function can run for a maximum of 45 seconds

export async function POST(request: Request) {
    const body = await request.json()
    const login = await verifyLogin()
    if (login) {
        const session: IronSession<Session> = await getIronSession(cookies(), ironSessionConfig);
        if (body.hasOwnProperty("prompt")) {
            let { prompt } = body
            prompt = prompt.trim()
            if (prompt === "") {
                return Response.json({ success: false, response: "Please enter a prompt to continue." }, { status: 400 })
            }
            await connectDB()
            const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
                },
            ]
            const model = ai.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings, systemInstruction: "Your name is HackEDUTopia AI. You were created by ByteMe Team. HackEDUTopia AI is an advanced tool powered by AI, designed to enhance your learning experience by making it more effective and efficient. It personalizes your learning, offers insightful recommendations, and helps you master complex concepts with ease, making it an ideal companion for students, professionals, and lifelong learners." })
            if (body.hasOwnProperty("chatID")) {
                const findHistory = await Chat.findOne({ user: session.user.userID, chatID: body.chatID })
                if (findHistory !== null && typeof findHistory !== undefined && Object.keys(findHistory).length !== 0) {
                    let history = findHistory.history
                    // remove the _id property from all objects of history array and history[].parts
                    history = history.map((h: any) => {
                        h = h.toObject()
                        delete h._id
                        h.parts = h.parts.map((p: any) => {
                            delete p._id
                            return p
                        })
                        return h
                    })
                    const History = history


                    const chat = model.startChat({
                        history: History
                    })
                    try {
                        const result = await chat.sendMessage(prompt);
                        const response = await result.response;
                        const text = response.text();
                        await Chat.findOneAndUpdate({ user: session.user.userID, chatID: findHistory.chatID }, {
                            history: [
                                ...findHistory.history,
                                { role: "user", parts: [{ text: prompt }] },
                                { role: "model", parts: [{ text: text }] }
                            ]
                        })
                        return Response.json({ success: true, response: text, chatID: findHistory.chatID })
                    } catch (error: unknown) {
                        console.log(error)
                        const err = error as { response: EnhancedGenerateContentResponse }
                        const safetyRatings = err.response.promptFeedback?.safetyRatings
                        let isHarmful = false
                        let suspended = false
                        safetyRatings?.forEach(async (rating: SafetyRating) => {
                            if (rating.probability === HarmProbability.HIGH) {
                                isHarmful = true
                                const misuse = {
                                    prompt,
                                    chatID: findHistory.chatID,
                                    safetyRatings
                                }
                                await User.findOneAndUpdate({ _id: session.user.userID }, {
                                    $push: { misuses: misuse }
                                })
                            }
                        })
                        const findMisuses = await User.findById(session.user.userID).select("misuses")
                        if (findMisuses?.misuses.length > 5) {
                            suspended = true
                            await User.findOneAndUpdate({ _id: session.user.userID }, { isSuspended: true })
                        }
                        if (isHarmful && suspended) {
                            return Response.json({ success: false, suspended: true, response: "### Account Suspended\nThis prompt has been flagged as harmful. Regrettably, **your account has been suspended due to repeated violations of our guidelines**. We prioritize user safety and won't tolerate actions that compromise it. Please contact support for further assistance." }, { status: 400 })
                        }
                        else if (isHarmful && !suspended) {
                            return Response.json({ success: false, response: "### Final Warning\nThis prompt has been flagged as harmful. This is your last chance to use this chatbot responsibly. **Any further misuse, including illegal or abusive prompts, will result in the permanent suspension of your account**. We take the safety and well-being of our users seriously and will not tolerate any actions that compromise it. Please respect these guidelines to ensure a positive experience for everyone. Thank you for your cooperation." }, { status: 400 })
                        }

                        if (!isHarmful) {
                            return Response.json({ success: false, response: "We apologize for the inconvenience. An unexpected error occurred on our end. Our team is working diligently to resolve the issue. Please try again shortly. If the problem persists, please contact our support team for further assistance." }, { status: 400 })
                        }
                    }
                }
                else {
                    return Response.json({ success: false, response: "Invalid Chat ID" }, { status: 400 })
                }
            }
            else {
                try {
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const text = response.text();
                    const title_result = await model.generateContent(`Generate only one Short Title for this prompt: "${prompt}". Do not write anything else in the response other than a single title.`)
                    const title_response = await title_result.response
                    const title = title_response.text()
                    let hash = crypto.createHash("md5").update(Date.now().toString() + prompt + title + session.user.userID.toString()).digest("hex")
                    const chatID = hash.substring(0, 16) + '-' + hash.substring(16);
                    console.log(session.user)
                    const chat = new Chat({
                        user: session.user.userID, chatID, title, history: [
                            {
                                role: "user",
                                parts: [{ text: prompt }]
                            },
                            {
                                role: "model",
                                parts: [{ text: text }]
                            }
                        ]
                    })
                    await chat.save()
                    return Response.json({ success: true, response: text, chatID, newChat: true })
                } catch (error: any) {
                    console.log(error)
                   return Response.json({ success: false, response: "An unexpected error occurred. Please try again later." }, { status: 500 })
                }

            }
        }

    }
    else{
        return Response.json({ success: false, response: "Unauthorized." }, { status: 401 })
    }
}