const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id = shortcut of id inside _id in db
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    })
})

passport.use(new GoogleStrategy ({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id});
    if (existingUser) {
      return done(null, existingUser); // 第一個參數是當錯誤時要做的事，這裡因為不會出錯所以傳null
    }

    const user = await new User({ googleID: profile.id }).save();
    done(null, user);
  })
); 


