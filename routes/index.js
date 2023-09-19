var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const {checkUserIsAuthenticated} = require('../middlewares/checkAuthenticated');
const connectEnsureLogin = require('connect-ensure-login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index Page' });
});

router.use('/user', connectEnsureLogin.ensureLoggedIn({ redirectTo : '/auth/login'}), userRouter);
router.use('/auth', authRouter);

module.exports = router;
