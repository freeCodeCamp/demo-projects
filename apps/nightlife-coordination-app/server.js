require("dotenv").config();

const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const authRouters = require("./routes/auth")
const cors = require('cors');
const bodyParser = require('body-parser')

require('./config/passport')(passport)
const app = express()

app.use(express.static(path.join(__dirname, "/views")))
app.use(express.static(path.join(__dirname, "/public")))

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URI);

app.use(session({
	secret: process.env.SECRET_SESSION || 'secret',
	resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/api", apiRoutes)
authRouters(app, passport)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}...`)
})