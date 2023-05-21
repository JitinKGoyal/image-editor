import { addImageService, deleteImageService, getAllImagesService } from "../services/image.service"
import dispatchFunction from "./dispatchFunction"

export const addImageAction = (data) => async dispatch => {

  dispatch(dispatchFunction({ processStatus: "pending" }))
  await addImageService(data)
  dispatch(dispatchFunction({ processStatus: "success" }))

}

export const getAllImagesAction = () => async dispatch => {
  const allImages = await getAllImagesService()
  dispatch(dispatchFunction({ allImages, processStatus: "" }))
}

export const deleteImageAction = (id) => async dispatch => {

  dispatch(dispatchFunction({ processStatus: "pending" }))
  await deleteImageService(id)
  dispatch(dispatchFunction({ processStatus: "success" }))
}

