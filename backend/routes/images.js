const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Images = require('../models/Images')
const User = require('../models/user');
const compressImage = require('../utils/imageCompress');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const postImagesValidations = [
    body('userId', 'image can not be added without userId').exists(),
    body('title', 'image must have a title').exists(),
    body('image', 'image must have a image').notEmpty()
]

const deleteImagesValidations = [
    body('userId', 'image can not be deleted without userId').exists(),
    body('id', 'image can not be deleted without id').exists()
]

const putImagesValidations = [
    body('id', 'image can not be updated without id').exists()
]

// Endpoint to post an image.
router.post('/', upload.single('image'), async (req, res) => {


    try {

        const { path: imagePath, originalname } = req.file;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        // const user = await User.findById(req.body.userId);

        // if (!user) return res.status(404).json({ error: "user does not exist" });


        // console.log("this is it", req.file)
        // console.log("this is body", req.body)

        const compresedImage = await compressImage(imagePath)

        // console.log(compresedImage)

        Images.create({
            user: req.body.userId,
            title: req.body.title,
            image: compresedImage,
            tag: req.body.tag,
        }).then(image => res.json(image));

    } catch (error) {
        console.log("error in adding image", error)
    }

})


// API to get all Images of a user
router.get('/:userId', async (req, res) => {

    const images = await Images.find({ user: req.params.userId });
    res.json(images);

})


// API to get all Images of a user
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

        Images.findById(req.body.id, async (err, note) => {

            if (err) {
                return res.status(404).json({ error: "image does not exists" });
            }

            if (note?.user?.toString() != req.body.userId) {
                return res.status(404).json({ error: "Access denied" });
            }

            note = await Images.findByIdAndDelete(req.body.id);
            res.json(note);
        });

    } catch (error) {
        console.log(error)
    }

})


module.exports = router;