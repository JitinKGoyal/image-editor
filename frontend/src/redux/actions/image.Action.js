import { addImageService, deleteImageService, getAllImagesService, getOriginalImageService } from "../services/image.service"
import dispatchFunction from "./dispatchFunction"

// Send image to backend
export const addImageAction = (data) => async dispatch => {

  dispatch(dispatchFunction({ processStatus: "pending" }))
  await addImageService(data)
  dispatch(dispatchFunction({ processStatus: "success" }))

}

// Get all images list
export const getAllImagesAction = () => async dispatch => {
  const allImages = await getAllImagesService()
  dispatch(dispatchFunction({ allImages, processStatus: "" }))
}

// Get Original image data
export const getOriginalImageAction = (id) => async dispatch => {
  const originalImage = await getOriginalImageService(id)
  dispatch(dispatchFunction({ originalImage, processStatus: "" }))
}

// Empty Original image data
export const enptyOriginalImageAction = () => dispatch => {
  dispatch(dispatchFunction({ originalImage: {}, processStatus: "" }))
}

// Delete an image
export const deleteImageAction = (id) => async dispatch => {

  dispatch(dispatchFunction({ processStatus: "pending" }))
  await deleteImageService(id)
  dispatch(dispatchFunction({ processStatus: "success" }))
}

