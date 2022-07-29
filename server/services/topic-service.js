const {Topic} = require('../models/models');

class TopicService{
    async create(topicData){
        const topic = await Topic.create(topicData);
        return topic;
    }

    async getOne(id){
        const topic = await Topic.findByPk(id);
        return topic;
    }

    async update(topicData){
        const topic = await Topic.findByPk(topicData.id);
        await topic.update(topicData);
        await topic.save();
        return topic;
    }

    async delete(topicData){
        await Topic.destroy({
            where:{
                id: topicData.id
            }
        });
    }

    async getAll(){
        const topics = await Topic.findAll();
        return topics;
    }

    async getTopicsByUserId(userId){
        const topics = await Topic.findAll({
            where:{
                userId: userId
            }
        });
        return topics;
    }
}

module.exports = new TopicService();