const mongoose = require('mongoose');

const dbURI = "mongodb://localhost:27017/image-editor";
// const dbURI = "mongodb+srv://jkgoyal85:bgkHhZlxka7ce0VP@cluster0.vnaluml.mongodb.net/image-editor?retryWrites=true&w=majority";


const connectMongo = () => {
    mongoose.connect(dbURI, () => {
        console.log("connection is establised");
    });
}

// non-blocking I/O model

module.exports = connectMongo;
