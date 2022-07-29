const Router = require('express')
const router = new Router()
const topicController = require('../controllers/topic-controller')
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware')

//Add autthmiddleware later

//CRUD routes
router.get('/:id', topicController.getOne);
router.post('/', topicController.create);
router.put('/', topicController.update);
router.delete('/', topicController.delete);

//others
router.get('/', topicController.getAll);
router.get('/:id/opinions/:userId', topicController.getOpinions);
module.exports = router