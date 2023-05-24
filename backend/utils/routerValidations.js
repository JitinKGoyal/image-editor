const { body } = require("express-validator")

// validations
const deleteImagesValidations = [
    body('userId', 'image can not be deleted without userId').exists(),
    body('id', 'image can not be deleted without id').exists()
]

const putImagesValidations = [
    body('id', 'image can not be updated without id').exists()
]


module.exports = { deleteImagesValidations, putImagesValidations }