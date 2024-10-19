import { Dispatch, SetStateAction, createContext } from "react";
import MessageType from "../interfaces/MessageType";

interface ChatBoxContextTypes{
    messages: MessageType[],
    setMessages: Dispatch<SetStateAction<MessageType[]>>,
    chatID: string,
    setChatID: Dispatch<SetStateAction<string>> 
}

const ChatBoxContext = createContext<ChatBoxContextTypes>({
    messages: [],
    setMessages: () => {},
    chatID: "",
    setChatID: () => {}
})

export default ChatBoxContext