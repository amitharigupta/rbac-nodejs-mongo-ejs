const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/hashPassword");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('register', { title: "Register Page", email: req.body.email, messages: req.flash() });
        return;
      }
      let { email, password } = req.body;
      let userExist = await User.findOne({ email });
      if (userExist) {
        res.redirect("/auth/register");
        return;
      }
      password = await hashPassword(password);
      const user = new User({ email, password });
      await user.save();
      req.flash('success', `${user.email} registered successfully, you can now login`);
      res.redirect('/auth/login');
      // res.send(user);
    } catch (error) {
      console.log("Error : ", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  },
};
