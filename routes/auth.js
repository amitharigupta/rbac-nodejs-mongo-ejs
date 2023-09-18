var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/login", async (req, res, next) => {
  res.render("login", { title: "Login Page"  });
});

router.get("/register", async (req, res, next) => {
  res.render("register", { title: "Register Page" });
});

router.post("/login", async (req, res, next) => {
  res.send("Login Post");
});

router.post("/register", async (req, res, next) => {
  res.send("Register Post");
});

router.get("/logout", async (req, res, next) => {
    res.send("logout");
})

module.exports = router;
