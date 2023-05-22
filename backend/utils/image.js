const sharp = require("sharp")

const compressImage = async (image, quality) => {

    const metadata = await sharp(image)
        .metadata()

    let height = Math.floor((metadata.height * quality) / 100)
    let width = Math.floor((metadata.width * quality) / 100)

    const compressedBuffer = await sharp(image)
        .resize(width, height) // Adjust the quality as desired (0-100)
        .toBuffer()

    const compressedData = compressedBuffer.toString('base64');

    return compressedData
}

module.exports = { compressImage }