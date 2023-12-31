require('dotenv').config()

const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const itemsRoutes = require('./routes/items')
const bodyParser = require('body-parser');

// express app
const app = express()

// middleware
app.use(express.json())
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/items', itemsRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })