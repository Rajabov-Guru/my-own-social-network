const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/auth-middleware')
const opinionController = require('../controllers/opinion-controller');

//Add autthmiddleware later

//CRUD routes
router.get('/:id', opinionController.getOne);
router.post('/', opinionController.create);
// router.put('/', opinionController.update);
router.delete('/', opinionController.delete);
router.post('/feedback', opinionController.feedback);

module.exports = router