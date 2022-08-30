//any routes that are top level will be here

const express = require('express') //bring is express to use express router
const router = express.Router()
const {
    ensureAuth
} = require('../middleware/auth')

const Post = require('../models/Post')

// @desc    Show add page
// @route   GET /posts/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('posts/add')
})

// @desc    Process add form
// @route   POST /posts
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id //going to give us data sent in from the form; but in order to do this we need express body parser middleware (adding to app.js)
        await Post.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')

    }
})

// @desc    Show all posts
// @route   GET /posts
router.get('/', ensureAuth, async (req, res) => {
    try {
        const posts = await Post.find({
                status: 'public'
            })
            .populate('user')
            .sort({
                createdAt: 'desc'
            })
            .lean()
        res.render('posts/index', {
            posts
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})

module.exports = router //so we can use this code in other files...