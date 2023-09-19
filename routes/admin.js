const router = require('express').Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.render('manage-users', { title: "Manage Users", users });
        // res.send(users);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id', async (req, res, next) => {
    try {
        const { id }= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', "Invalid Id");
            res.redirect('/admin/users');
            return;
        }
        const person = await User.findById(id);
        res.render('profile', { title: "Profile Page", person });

    } catch (error) {
        next(error);
    }
})

module.exports = router;