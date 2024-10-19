
import { CircularProgress, ThemeProvider } from '@mui/material'
import React from 'react'

interface Props {
    text: string
    processing: boolean,
    onClick: () => void,
}

declare module '@mui/material/CircularProgress' {
    interface CircularProgressPropsColorOverrides {
      white: true;
    }
  }

const SubmitButton = (props: Props) => {
    return (
        <>
            <div className="relative w-full my-4 self-center flex">
                <button className="bg-gray-900 disabled:cursor-not-allowed text-white rounded-xl text-center text-lg sm:text-xl p-2.5 sm:p-4 w-full" onClick={props.onClick} disabled={props.processing}>
                        {!props.processing ? <span>{props.text}</span> : <div className="flex justify-center items-center"><CircularProgress color="white" size={25}/></div>}
                </button>
            </div>
        </>
    )
}

export default SubmitButton
