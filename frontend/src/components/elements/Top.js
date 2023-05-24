import React from 'react'
import "./top.css"

const Top = () => {
    return (
        <>

            <div className='go_to_top'>
                <a href="#root">
                    <div dangerouslySetInnerHTML={{ __html: '&Uarr;' }}></div>
                    <span>Top</span>
                </a>
            </div>

        </>
    )
}

export default Top