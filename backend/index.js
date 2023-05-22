// api endpoint 
const express = require('express')
const connectMongo = require('./db')
const cors = require('cors')
const multer = require('multer');

connectMongo();

const app = express()
const port = 3003

app.use(cors())
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/images', require('./routes/images'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`cloud-notebook app listening on port ${port}`)
})


// mongoose, nodemon, express