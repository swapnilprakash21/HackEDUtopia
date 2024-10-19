import ChatBox from '@/components/chat/ChatBox'
import Sidebar from '@/components/dashboard/Sidebar'
import verifyLogin from '@/lib/verifyLogin'
import { redirect } from 'next/navigation'

const ChatPage = async () => {
    const login = await verifyLogin()
    if (login) {
        return (
            <>
                <title>{`New Chat - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
                <Sidebar page='ai-chatbot' />
                <div className="ml-80 px-3 min-h-screen">
                    <ChatBox fetchChatHistory={false} user_name={""} />
                </div>
            </>
        )
    }
    else {
        redirect("/")
    }
}

export default ChatPage
