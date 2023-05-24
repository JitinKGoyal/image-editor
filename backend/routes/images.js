const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Images = require('../models/Images')
const User = require('../models/user');
const { compressImage } = require('../utils/image');
const multer = require('multer');
const OriginalImages = require('../models/OriginalImages');
const { addImageController } = require('../controllers/imageController');
const { default: mongoose } = require('mongoose');

const upload = multer({ storage: multer.memoryStorage() });

const deleteImagesValidations = [
    body('userId', 'image can not be deleted without userId').exists(),
    body('id', 'image can not be deleted without id').exists()
]

const putImagesValidations = [
    body('id', 'image can not be updated without id').exists()
]

// Endpoint to post an image.
router.post('/', upload.single('image'), addImageController)

// API to get all Images of a user
router.get('/:userId', async (req, res) => {

    const images = await Images.find({ user: req.params.userId });
    res.json(images);

})


// API to get all Images of a user
router.get('/getImg/:imgId', async (req, res) => {

    try {

        const image = await OriginalImages.findById(req.params.imgId);
        res.json(image);

    } catch (error) {
        console.log(error)
    }
})


// API to update image of a user
router.put('/', putImagesValidations, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let note = await Images.findById(req.body.id);

    note.title = req.body.title;
    note.description = req.body.description;
    note.tag = req.body.tag;

    note = await Images.findByIdAndUpdate(req.body.id, { $set: note }, { new: true });

    res.json(note);

})

// API to delete a note
router.delete('/', deleteImagesValidations, (req, res) => {
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

            let a = await Images.deleteOne({ originalImage: mongoose.Types.ObjectId(req.body.id) });
            let b = await OriginalImages.findByIdAndDelete(req.body.id);

            console.log(a)
            console.log(b)

            res.json(true);
        });

    } catch (error) {
        console.log(error)
    }

})


module.exports = router;