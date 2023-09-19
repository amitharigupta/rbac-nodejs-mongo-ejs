var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');

/* GET users listing. */
router.get("/login", ensureLoggedOut({ redirectTo: '/' }), async (req, res, next) => {
  res.render("login", { title: "Login Page" });
});

router.post("/login", ensureLoggedOut({ redirectTo: '/' }), passport.authenticate('local', {
  // successRedirect: "/user/profile",
  successReturnToOrRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

router.get("/register", ensureLoggedOut({ redirectTo: '/' }), async (req, res, next) => {
  res.render("register", { title: "Register Page" });
});

router.post(
  "/register",
  ensureLoggedOut({ redirectTo: '/' }),
  registerValidator,
  AuthController.registerUser
);

router.get("/logout", ensureLoggedIn({ redirectTo: '/' }), (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
