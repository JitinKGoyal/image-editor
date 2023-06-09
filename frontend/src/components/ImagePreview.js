import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addImageAction, deleteImageAction, enptyOriginalImageAction, getAllImagesAction, } from '../redux/actions/image.Action';
import { notify } from '../utils/toast';
import Spinner from './Spinner';
import Top from './elements/Top';
// import compressImage from '../utils/imageCompress';

function ImagePreview(props) {

  const { allStates } = useSelector(e => e)
  const images = allStates.allImages
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isloading, setIsloading] = useState(false)

  // Function to add an image.
  async function handleImage(e) {
    const files = e.target.files
    dispatch(addImageAction(files))
  }

  // Function to delete an image.
  const forDeleteImage = (id) => {
    dispatch(deleteImageAction(id))
  }

  // Function to logout
  const logoutBtn = () => {
    localStorage.removeItem("my-image-editor")
    navigate("/login")
    notify("Logged out successfully", toast.TYPE.SUCCESS)
  }

  // useEffect for first mount of component.
  useEffect(() => {
    dispatch(enptyOriginalImageAction())

    const data = JSON.parse(localStorage.getItem("my-image-editor"));
    if (data?._id) {
      setIsloading(true)
      dispatch(getAllImagesAction())
    } else {
      navigate("/login")
    }

  }, [])

  // useEffect to get all images after adding and deleting image
  useEffect(() => {

    if (allStates.processStatus === "pending") {
      setIsloading(true)
    }

    if (allStates.processStatus === "success") {
      dispatch(getAllImagesAction())
    }

    if (allStates.processStatus === "") {
      setIsloading(false)
    }

  }, [allStates])

  // console.log(allStates)

  return (
    <>

      <div className='d-flex justify-content-end'>
        <button className='btn btn-info m-3 shadow' onClick={logoutBtn}><img height="25px" src="/images/icons/icons8-logout-rounded-left-60.png" alt="" />Logout</button>
      </div>

      <h2 className='text-center mt-3 heading' style={{ fontFamily: "'Monoton', cursive" }}>Preview</h2>
      <input type="file" multiple className='imgLable' id='imgId' onChange={handleImage} /><br />
      <hr />

      {isloading ? <Spinner message="Loading images..." /> : <div> {images?.length !== 0 &&
        <div>
          <p className='display-4 ml-5'>
            Total images: {images?.length}
          </p>
          <div className='d-flex flex-wrap'>

            {images?.map((e, i) =>

              <div key={i} onClick={() => navigate("/imageEditor", { state: e.originalImage })} title="Open image in editor" className='d-flex justify-content-center shadow-lg p-4 imgPreview'>
                <img src={`data:image/jpeg;base64,${e.image}`} height="200px" alt="" />
                <div className='deleteIcon ' onClick={(k) => {
                  k.stopPropagation();
                  forDeleteImage(e.originalImage)
                }}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>

            )}
          </div>
        </div>
      }</div>}

      <Top />

    </>
  )
}

export default ImagePreview;