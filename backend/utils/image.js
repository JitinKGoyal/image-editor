const sharp = require("sharp")

const compressImage = async (image, quality) => {

    const compressedBuffer = await sharp(image)
        .jpeg({ quality }) // Adjust the quality as desired (0-100)
        .toBuffer()

    const compressedData = compressedBuffer.toString('base64');

    return compressedData
}

module.exports = { compressImage }