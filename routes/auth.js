//google authentication routes

const express = require('express') //bring is express to use express router
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/' //if authentication failed, go back to log in screen
}), (req, res) => {
    res.redirect('/dashboard') //if authenticaiton is successfull, go to dashboard
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    // req.logout()
    // res.redirect('/')
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
})
// router.post('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         // res.redirect('/');
//         req.session.destroy((err) => {
//             res.clearCookie('connect.sid');
//             // Don't redirect, just print text    res.send('Logged out');
//             res.redirect('/');
//         });
//     });

// });


module.exports = router //so we can use this code in other files...