const User = require('../models/user');
const { saveOriginalImageService, saveCompressedImageService } = require("../services/imageService")

const addImageController = async (req, res) => {

    try {

        const buffer = req.file.buffer;
        const user = await User.findById(req.body.userId);

        if (!user) return res.status(404).json({ error: "user does not exist" });

        // Save original image
        const originalImageId = await saveOriginalImageService(buffer, req)

        // Save compressed replica of image
        await saveCompressedImageService(buffer, req, originalImageId)

        res.json({ data: "success" })

    } catch (error) {
        console.log("error in adding image", error)
    }

}


module.exports = { addImageController }