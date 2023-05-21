
import React, { useEffect, useState } from 'react'
import PreviewInEditor from './PreviewInEditor';
import Sidebar from './Sidebar';

function ImageEditor(props) {

  

    return (
        <>
            <div className='d-flex justify-content-between'>

                <Sidebar />

                <PreviewInEditor props={props} />

            </div>
            
        </>
    )
}

export default ImageEditor