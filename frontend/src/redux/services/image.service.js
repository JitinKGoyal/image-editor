import { toast } from "react-toastify"
import { notify } from "../../utils/toast"
import { addImageRequest, deleteImageRequest, getAllImagesRequest, getOriginalImagesRequest } from "../backend/image/imageRequests"

export const addImageService = async (data) => {

    
    await addImageRequest(data)

    notify("Image uploaded successfully", toast.TYPE.SUCCESS)
}

export const getAllImagesService = async () => {

    const allImages = await getAllImagesRequest()
    return allImages
}

export const deleteImageService = async (id) => {

    await deleteImageRequest(id)
    notify("Image deleted successfully", toast.TYPE.SUCCESS)
}

export const getOriginalImageService = async (id) => {

    const image = await getOriginalImagesRequest(id)
    return image
}


