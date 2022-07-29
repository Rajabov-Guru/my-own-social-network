const Router = require("express").Router;

const router = new Router();

const userRouter = require('./userRouter');
const topicRouter = require('./topicRouter');
const opinionRouter = require('./opinionRouter');
const chatRouter = require('./chatRouter');

router.use('/users', userRouter);
router.use('/topics', topicRouter);
router.use('/opinions', opinionRouter);
router.use('/chat', chatRouter);
// router.use('/followers', followerRouter);



module.exports = router;