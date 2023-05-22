const { COMPRESSION_PERCENTAGE } = require("../config");
const Images = require("../models/Images");
const OriginalImages = require("../models/OriginalImages");
const { compressImage } = require("../utils/image");

const saveOriginalImageService = async (buffer, req) => {

    try {

        const originalImage = await compressImage(buffer, 100)

        const imageObj = {
            user: req.body.userId,
            title: req.body.title,
            image: originalImage,
            tag: req.body.tag,
        }

        const res = await OriginalImages.create(imageObj)

        return res._id

    } catch (error) {
        console.log(error)
    }

}

const saveCompressedImageService = async (imagePath, req, originalImageId) => {

    try {

        const compresedImage = await compressImage(imagePath, COMPRESSION_PERCENTAGE)

        const imageObj = {
            user: req.body.userId,
            title: req.body.title,
            originalImage: originalImageId,
            image: compresedImage,
            tag: req.body.tag,
        }

        const res = await Images.create(imageObj)

        return res

    } catch (error) {
        console.log(error)
    }

}

module.exports = { saveOriginalImageService, saveCompressedImageService }