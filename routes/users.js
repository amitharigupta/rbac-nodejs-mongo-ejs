var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile',async (req, res, next) => {
  res.send('User Profile Called');
});

module.exports = router;
