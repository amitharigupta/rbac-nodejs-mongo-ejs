var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/profile", async (req, res, next) => {
  const person = req.user;
  res.render("profile", { title: "Profile Page", person });
});

module.exports = router;
