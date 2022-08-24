//any routes that are top level will be here

const express = require('express') //bring is express to use express router
const router = express.Router()
const {
    ensureAuth,
    ensureGuest
} = require('../middleware/auth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    //res.send('Login') //testing before we created the views
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    //res.send('Dashboard') //testing before we created the views
    // console.log(req.user)
    res.render('dashboard', {
        name: req.user.firstName
    })
})

module.exports = router //so we can use this code in other files...