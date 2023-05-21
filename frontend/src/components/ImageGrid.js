import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllImagesAction } from '../redux/actions/image.Action'

function ImageGrid() {

    const dispatch = useDispatch()
    const { allImages } = useSelector(e => e.allStates)
    const images = allImages;


    useEffect(() => {
        dispatch(getAllImagesAction())
    }, [])

    return (
        <>
            <div>
                <div className='d-flex flex-wrap'>
                    {images?.map((e, i) => (

                        <div key={i}  title="Open image in editor" className='d-flex justify-content-center shadow-lg p-4 imgPreview'>
                            <img src={e.image} height="200px" alt="" />
                            {/* <div className='deleteIcon ' onClick={(k) => forDeleteImage(i, k, e._id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </div> */}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageGrid