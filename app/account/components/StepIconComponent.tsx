"use client"

import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StepIcon } from "@mui/material"

interface StepIconComponentProps {
    step: number,
    activeStep: number
}


const StepIconComponent = (props: StepIconComponentProps) => {
    return <StepIcon
        icon={
            <>
                {(props.activeStep + 1) === props.step ? <div className="rounded-full text-sm bg-gray-900 text-white h-6 w-6 flex items-center justify-center">{props.step}</div> : (props.activeStep + 1) > props.step ? <div className="rounded-full text-sm bg-green-700 text-white h-6 w-6 flex items-center justify-center"><FontAwesomeIcon icon={faCheck}/></div> : <div className="rounded-full text-xs md:text-sm bg-gray-500 text-white h-6 w-6 flex items-center justify-center">{props.step}</div>
                }
            </>
        }
    />
}

export default StepIconComponent