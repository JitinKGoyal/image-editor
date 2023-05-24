const express = require('express');
const multer = require('multer');

const router = express.Router();

const { addImageController, getImagesListController, getOriginalImageController, updateImageController, deleteImageController } = require('../controllers/imageController');
const { putImagesValidations, deleteImagesValidations } = require('../utils/routerValidations');

const upload = multer({ storage: multer.memoryStorage() });

// Endpoint to post an image.
router.post('/', upload.single('image'), addImageController)

// API to get all Images of a user
router.get('/:userId', getImagesListController)

// API to get original image
router.get('/getImg/:imgId', getOriginalImageController)

// API to update image of a user
router.put('/', putImagesValidations, updateImageController)

// API to delete an image
router.delete('/', deleteImagesValidations, deleteImageController)

module.exports = router;