//any routes that are top level will be here

const express = require('express') //bring is express to use express router
const router = express.Router()
const {
    ensureAuth,
    ensureGuest
} = require('../middleware/auth')

const Post = require('../models/Post')

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
router.get('/dashboard', ensureAuth, async (req, res) => {
    //res.send('Dashboard') //testing before we created the views
    // console.log(req.user)
    try {
        const posts = await Post.find({
            user: req.user.id
        }).lean() //in order to pass in data to a handlebars template and render it, we need to call .lean, to handle as js objects instead of mongoose templates
        res.render('dashboard', {
            name: req.user.firstName,
            posts
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})

module.exports = router //so we can use this code in other files...