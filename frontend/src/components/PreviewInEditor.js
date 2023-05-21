import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

export default function PreviewInEditor(props) {

    const [sizePercentage, setSizePercentage] = useState(100)

    function handleResize(e) {
        const val = e.target.value

        document.getElementById("image").style.zoom = val / 100 + 0.01

        if (val == 0) {
            setSizePercentage(0.01)
        } else {
            setSizePercentage(val)
        }
    }

    // useEffect(() => {

    //     let element = document.getElementById('image');
    //     let canvas = document.getElementById('image-canvas')
    //     let ctx = canvas.getContext('2d');

    //     console.log(element.width)
    //     console.log(element.height)

    //     ctx.canvas.width = (element.width)
    //     ctx.canvas.height = (element.height)

    //     ctx.drawImage(element, 0, 0, canvas.width, canvas.height);



    // }, [])




    return (
        <>
            <div style={{ width: "80.5%", height: "300px" }}>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger m-3 shadow' onClick={() => props.props.setSelectedImage("")}>X</button>
                </div>

                <div className='shadow-lg p-4 editImage' id='img-prt'>
                    <img src={props.props.selectedImage} className='rounded shadow-lg' id="image" alt=""  />
                </div>

                {/* <div className='shadow-lg p-4 editImage' id='canvas-prt'>
                    <canvas id='canvas1' style={{ display: "none" }}></canvas>

                </div>

                <div className='longRange'>
                    <p> <img src="images/icons/icons8-saturation-48.png" height="25px" alt="" /> Percentage</p>
                    <input type="range" name='percentageSize' defaultValue="50"  />
                </div> */}
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
