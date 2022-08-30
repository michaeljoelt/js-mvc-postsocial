const path = require('path') // a core nodejs module, allows us to use path.join to handle paths
const express = require('express') //create basic express server
// const mongoose = require('mongoose')
const dotenv = require('dotenv') //for our config variables
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo') //(session)
const connectDB = require('./config/db.js')
// const {
//     default: mongoose
// } = require('mongoose')

//Load config / global variables (dotenv)
dotenv.config({
    path: './config/config.env'
})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// Logging (Morgan)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) //shows requests/responses in console in dev mode
}

//Handlebars Helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon
} = require('./helpers/hbs') //using "destructuring" since we're oging to have a bunch of them

// Handlebars
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon
    },
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, //we dont save session if nothing is modified
    saveUninitialized: false, //dont create session until something is stored
    store: MongoStore.create({
        // mongooseConnection: mongoose.connection,
        mongoUrl: process.env.MONGO_URI
    }) // store user session in database so they don't have to log in every time
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public'))) //for static, public assets

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', require('./routes/posts'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))