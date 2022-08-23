//any routes that are top level will be here

const express = require('express') //bring is express to use express router
const router = express.Router()

// @desc    Login/Landing page
// @route   GET /
router.get('/', (req, res) => {
    //res.send('Login') //testing before we created the views
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', (req, res) => {
    //res.send('Dashboard') //testing before we created the views
    res.render('dashboard')
})

module.exports = router //so we can use this code in other files...