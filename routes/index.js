var express = require('express');
var router = express.Router();

/* GET home. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Paises del mundo' });
});


/* GET home page index. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Paises del mundo' });
});

module.exports = router;
