const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) { //in app.js Passport config section, we passed passport in so we can use it here
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            //console.log(profile)
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({
                    googleId: profile.id
                })
                if (user) {
                    done(null, user) //user exists, pass it back (null is for the error)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })

    /*
    // from:  https://www.passportjs.org/concepts/authentication/
        passport.serializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, {
                id: user.id,
                username: user.username,
                picture: user.picture
              });
            });
          });
          
          passport.deserializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, user);
            });
          });
    */
}