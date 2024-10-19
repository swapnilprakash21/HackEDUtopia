import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '@mui/material'

const ListeningModal = () => {
    return (
        <>
            <Modal
                open={true}
                onClose={() => { }}

            >
                <div className="my-32 flex justify-center outline-none">
                    <div className="bg-white w-full sm:w-96 sm:rounded-lg px-4 py-16">
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <div className="w-40 h-40 bg-gray-200 rounded-full animate-ping"></div>
                                <div className="w-[130px] h-[130px] bg-gray-300 rounded-full animate-ping absolute inset-0 m-auto"></div>
                                <div className="w-32 h-32 rounded-full bg-red-600 flex justify-center items-center absolute inset-0 m-auto">
                                    <FontAwesomeIcon icon={faMicrophone} className="text-white text-5xl" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-10">
                            <p className="text-center text-2xl font-semibold">Listening...</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ListeningModal
