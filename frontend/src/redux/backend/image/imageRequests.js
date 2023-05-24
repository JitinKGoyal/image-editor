import { baseUrl } from "../../../config"
import { loggedInUserId } from "../../../utils/loggedInUserId"
const FormData = require('form-data');

// request to add image
export const addImageRequest = async (binary) => {
    try {

        const formData = new FormData()
        formData.append("image", binary)
        formData.append("title", "jitin")
        formData.append("userId", loggedInUserId)

        const headers = formData.getHeaders;

        const response = await fetch(`${baseUrl}/images`, {
            method: "POST",
            headers,
            body: formData
        })
        const data = await response.json()
        return data

    } catch (err) {
        console.error("error in adding image: ", err)
    }
}

// request to get all images
export const getAllImagesRequest = async (binary) => {
    try {
        const res = await fetch(`${baseUrl}/images/${loggedInUserId}`)
        const data = await res.json()
        return data

    } catch (err) {
        console.error("error in getting image: ", err)
    }
}

// request to get all images
export const getOriginalImagesRequest = async (originalImageId) => {
    try {
        const res = await fetch(`${baseUrl}/images/getImg/${originalImageId}`)
        const data = await res.json()
        return data

    } catch (err) {
        console.error("error in getting image: ", err)
    }
}

// request to delete image
export const deleteImageRequest = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/images`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: loggedInUserId,
                id: id
            })

        })
        const data = await response.json()
        return data

    } catch (err) {
        console.error("error in adding image: ", err)
    }
}