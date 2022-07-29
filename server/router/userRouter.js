const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}), 
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
//Добавить authmiddleware 
router.get('/:nickname', userController.getUserByNick);
router.post('/subscribe', userController.subscribe);
router.post('/unsubscribe', userController.unSubscribe);
router.post('/issubscribe', userController.isSubscribe);
router.get('/:userId/subscriptions', userController.getSubscriptions);
router.get('/:userId/subscribers', userController.getSubscribers);

router.post('/changeinfo',userController.changeInfo);
router.get('/:userId/topics', userController.getTopics);

module.exports = router