var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const { body } = require("express-validator");
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');

/* GET users listing. */
router.get("/login", ensureLoggedOut({ redirectTo: '/' }), async (req, res, next) => {
  res.render("login", { title: "Login Page" });
});

router.post("/login", ensureLoggedOut({ redirectTo: '/' }), passport.authenticate('local', {
  successRedirect: "/user/profile",
  // successReturnToOrRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

router.get("/register", ensureLoggedOut({ redirectTo: '/' }), async (req, res, next) => {
  res.render("register", { title: "Register Page" });
});

router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength(2)
      .withMessage("Password length too short, min 2 char required"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),
  ],
  AuthController.registerUser
);

router.get("/logout", ensureLoggedIn({ redirectTo: '/' }), async (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
