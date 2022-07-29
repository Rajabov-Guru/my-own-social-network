const opinionService = require("../services/opinion-service");

class OpinionController{
    async create(req, res, next){
        try {
            const {content, userId, topicId} = req.body;
            const opinion = await opinionService.create({content, userId, topicId});
            return res.json({opinion});
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params;
            const opinion = await opinionService.getOne(id);
            return res.json({opinion});
        } catch (error) {
            next(error)
        }
    }

    async feedback(req, res, next){
        try {
            const {id, userId, flag} = req.body;
            const result = await opinionService.setFeedBack(id, userId, flag);
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }


    async delete(req, res, next){
        try {
            const {opinionId} = req.body;
            await opinionService.delete(opinionId);
            res.json({message:"Deleted"});
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new OpinionController();