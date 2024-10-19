interface Props {
    name: string;
    message: string,
}

const Message = (props: Props) => {
    return (
        <div className="py-2 px-3">
            <div className={`w-full box-border ${props.name === "HackEDUTopia AI" ? "bg-gradient-to-b from-orange-50 to-pink-50" : "bg-stone-100"} rounded-xl py-3 px-6`}>
                <div className="flex items-center my-4 w-fit select-none">
                    {
                        props.name === "HackEDUTopia AI" && <>
                            <div className="px-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/ai-chatbot.svg" alt="" className="h-9 w-9 inline-block" draggable={false} />
                            </div>
                        </>
                    }
                    <div className={`${props.name === "You" ? "bg-gray-900 text-white" : "bg-gradient-to-tr from-pink-400 to-[#3CBAF7] text-white"} rounded-lg mx-3 px-5 py-2 font-bold`}>
                        <span className="px-2">{props.name}</span>
                    </div>
                </div>
                <pre className="text-gray-700 break-words whitespace-pre-wrap unreset py-6" style={{ fontFamily: "inherit" }} dangerouslySetInnerHTML={{ __html: props.message }}></pre>
            </div>
        </div>
    )
}

export default Message
