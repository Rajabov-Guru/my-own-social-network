const opinionService = require("../services/opinion-service");
const topicService = require("../services/topic-service")
const userService =  require("../services/user-service")


class TopicController{
    async create(req, res, next){
        try {
            const {userId, title, description} = req.body;
            const topic = await topicService.create({userId, title, description});
            await userService.changeTopicsCount(userId, true);
            return res.json({topic});
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params;
            const topic = await topicService.getOne(id);
            return res.json({topic});
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next){
        try {
            const {id, userId, title, description} = req.body;
            const topic = await topicService.update({id, userId, title, description});
            return res.json({topic});
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next){
        try {
            const {id, userId, title, description} = req.body;
            await topicService.delete({id, userId, title, description});
            await userService.changeTopicsCount(userId, false);
            return res.json({message:"Deleted"});
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next){
        try {
            const topics = await topicService.getAll();
            return res.json({topics});
        } catch (error) {
            next(error);
        }
    }

    async getOpinions(req, res, next){
        try {
            const {id, userId} = req.params;
            // const {userId} = req.body;
            console.log(`USER ID HERE: ${userId}`);
            // console.log(`REQ BODY HERE: ${JSON.stringify(req.body)}`);
            const opinions = await opinionService.findAllByTopic(id, userId);
            return res.json({opinions});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TopicController();