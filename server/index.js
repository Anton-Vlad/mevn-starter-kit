require('dotenv').config()

const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const path = require("path")
const connectDB = require("./config/database")
const credentials = require("./middleware/credetials")
const errorHandlerMiddleware = require("./middleware/error_handler")
const authentication = require('./middleware/authentication')

const app = express()
const PORT = 3500

connectDB()

// Allow Credentials 
app.use(credentials)
app.use(authentication)

// CORS
app.use(cors(corsOptions))

// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// application/json response
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// static files
app.use("/static", express.static(path.join(__dirname, 'public')))

//  Default error handler
app.use(errorHandlerMiddleware)


// Routes
app.use("/api/auth", require('./routes/api/auth'))

// Default Route
app.all("*", (req, res) => {
    res.status(404)

    if (req.accepts('json')) {
        res.json({'error': '404 Not Found'})
    } else {
        res.type('text').send('404 Not Found')
    }
})


mongoose.connection.once("open", () => {
    console.log("DB connected")
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    })
})