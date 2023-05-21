import React from 'react'
import PreviewInEditor from './PreviewInEditor';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

function ImageEditor(props) {

    const location = useLocation()

    return (
        <>
            <div className='d-flex justify-content-between'>

                <Sidebar />

                <PreviewInEditor props={props} oId={location.state} />

            </div>
        </>
    )
}

export default ImageEditor