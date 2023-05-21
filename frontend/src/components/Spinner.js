import React from 'react'
import { CirclesWithBar } from "react-loader-spinner";

function Spinner({ message }) {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100 '>
                <CirclesWithBar
                    color='white'
                    height={50}
                    className='m-5'
                />
            </div>
            <p className='text-lg text-center px-2'>{message}</p>
        </>
    )
}

export default Spinner