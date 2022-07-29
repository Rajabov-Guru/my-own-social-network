const Router = require('express')
const router = new Router()
const chatController = require('../controllers/chat-controller')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/', chatController.create);
router.post('/message', chatController.addMessage);
router.get('/:key1/:key2', chatController.getByUsers);

module.exports = router