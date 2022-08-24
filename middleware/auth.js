// middlewear is just a function that has access to the request and response objects
module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next() //move on, becayse they're logged in
        } else {
            res.redirect('/') //redirect back to log in
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard') //if logged in, go to dashboard
        } else {
            return next()
        }
    }
}