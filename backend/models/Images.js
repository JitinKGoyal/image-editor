const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    originalImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'originalImage',
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        data: Buffer,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("images", ImageSchema);