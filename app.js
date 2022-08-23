const path = require('path') // a core nodejs module, allows us to use path.join to handle paths
const express = require('express') //create basic express server
const dotenv = require('dotenv') //for our config variables
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db.js')

//Load config / global variables (dotenv)
dotenv.config({
    path: './config/config.env'
})

connectDB()

const app = express()

// Logging (Morgan)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) //shows requests/responses in console in dev mode
}

// Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Static folder
app.use(express.static(path.join(__dirname, 'public'))) //for static, public assets

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))