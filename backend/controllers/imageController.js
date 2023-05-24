const { validationResult } = require('express-validator');
const User = require('../models/user');
const { saveOriginalImageService, saveCompressedImageService } = require("../services/imageService");
const Images = require('../models/Images');
const OriginalImages = require('../models/OriginalImages');
const { default: mongoose } = require('mongoose');

// Add image for a user
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

// Get images list for a user 
async function getImagesListController(req, res) {


    const images = await Images.find({ user: req.params.userId });
    res.json(images);

}

// Get original image
async function getOriginalImageController(req, res) {

    try {

        const image = await OriginalImages.findById(req.params.imgId);
        res.json(image);

    } catch (error) {
        console.log(error);
    }
}

// Delete an image with its original copy
function deleteImageController(req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        OriginalImages.findById(req.body.id, async (err, image) => {
            // console.log(image)

            if (err) {
                return res.status(404).json({ error: "image does not exists" });
            }

            if (image?.user?.toString() != req.body.userId) {
                return res.status(404).json({ error: "Access denied" });
            }

            await Images.deleteOne({ originalImage: new mongoose.Types.ObjectId(req.body.id) });
            await OriginalImages.findByIdAndDelete(req.body.id);

            res.json(true);
        });

    } catch (error) {
        console.log(error);
    }

}

// Update an image
async function updateImageController(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let note = await Images.findById(req.body.id);

    if (note) {

        note.title = req.body.title;
        // note.description = req.body.description;
        note.tag = req.body.tag;

        note = await Images.findByIdAndUpdate(req.body.id, { $set: note }, { new: true });
    }

    res.json(note);

}

module.exports = {
    addImageController,
    getImagesListController,
    getOriginalImageController,
    deleteImageController,
    updateImageController
}