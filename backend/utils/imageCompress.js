const sharp = require("sharp")


const compressImage = async (image) => {
 
    const compressedBuffer = await sharp(image)
        .jpeg({ quality: 1 }) // Adjust the quality as desired (0-100)
        .toBuffer()

    const compressedData = compressedBuffer.toString('base64');

    return compressedData
}

module.exports = compressImage