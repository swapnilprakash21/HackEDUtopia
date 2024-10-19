"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    label: string;
    icon: any;
    inputType: string;
    inputName: string;
    inputID: string;
    placeholder: string;
    value: string;
    changeValue: Function
}

const Input = (props: Props) => {
    return (
        <div className="mb-4">
            <label htmlFor="email">{props.label}</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <FontAwesomeIcon icon={props.icon} className="text-gray-800 text-xl" />
                </span>
                <input type={props.inputType} name={props.inputName} id={props.inputID} className="w-full outline-none border border-gray-800 rounded-lg pl-12 px-3 py-3 focus:ring-2 focus:ring-gray-400 placeholder:text-gray-600 my-2" placeholder={props.placeholder} value={props.value} onChange={(e)=>{
                    props.changeValue(e.target.value)
                }}/>
            </div>
        </div>
    )
}

export default Input
