const sharp = require("sharp")

const compressImage = async (byteCode) => {


    const compressedImage = await sharp(byteCode)
        .toFormat(imageType)
        .jpeg({ quality: 10 }) // Adjust the quality as desired (0-100)
        .toBuffer()

    console.log(compressedImage)
    return compressedImage
}

module.exports = compressImage