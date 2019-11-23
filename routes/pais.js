var express = require('express');
var router = express.Router();
var userController = require('../controllers/PaisController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pais', { title: 'Paises' });
});

router.get('/:cp', userController.getOne);
router.get('/', userController.getAll);

router.post('/',userController.register);
router.put('/:cp', userController.update);
router.delete('/:cp',userController.delete);

module.exports = router;
