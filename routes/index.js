var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const {checkUserIsAuthenticated} = require('../middlewares/checkAuthenticated');
const connectEnsureLogin = require('connect-ensure-login');
const { checkUserLoggedInIsAdmin } = require('../middlewares/checkAuthenticated');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index Page' });
});

router.use('/user', connectEnsureLogin.ensureLoggedIn({ redirectTo : '/auth/login'}), userRouter);
router.use('/auth', authRouter);

router.use('/admin', connectEnsureLogin.ensureLoggedIn({ redirectTo : '/auth/login'}), checkUserLoggedInIsAdmin, adminRouter);

module.exports = router;
