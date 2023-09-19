const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const { comparePassword } = require('../utils/hashPassword');

passport.use(
  new LocalStategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        // Username / email does not exist
        if(!user) {
            return done(null, false, { message: "Username/Email is not registered" });
        }
        // Email exist and we need to verify the password
        let isPassMatch = await comparePassword(password, user.password);
        console.log(isPassMatch , "isPassMatch");
        if(!isPassMatch) {
            return done(null, false, { message: "Username/Email is incorrect" });
        } else {
            return done(null, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    let user = await User.findById(id);
    if(user) done(null, user);
});

