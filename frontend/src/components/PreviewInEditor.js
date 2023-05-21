import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { enptyOriginalImageAction, getOriginalImageAction } from '../redux/actions/image.Action';
import { Link } from 'react-router-dom';

export default function PreviewInEditor(props) {

    const [sizePercentage, setSizePercentage] = useState(100)
    const dispatch = useDispatch()

    const originalImage = useSelector(e => e.allStates.originalImage)

    function handleResize(e) {
        const val = e.target.value

        document.getElementById("image").style.zoom = val / 100 + 0.01

        if (val == 0) {
            setSizePercentage(0.01)
        } else {
            setSizePercentage(val)
        }
    }

    useEffect(() => {
        dispatch(getOriginalImageAction(props.oId))
    }, [])

    return (
        <>
            <div style={{ width: "80.5%", height: "300px" }}>

                <div className='d-flex justify-content-end'>
                    <Link className='btn btn-danger m-3 shadow' to="/images" >X</Link>
                </div>

                <div className='shadow-lg p-4 editImage' id='img-prt'>
                    <img src={`data:image/jpeg;base64,${originalImage?.image}`} className='rounded shadow-lg' id="image" alt="" />
                </div>

                <div className='d-flex justify-content-around align-items-center'>

                    <div className='resizeInput' >

                        <input type="range" onChange={handleResize} defaultValue="100" />
                        <p className='text-center'>Resize image</p>

                    </div>
                    <div className='text-bold percentageSize'>
                        {sizePercentage}%
                    </div>
                </div>
            </div>
        </>
    )
}
