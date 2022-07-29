const ApiError = require('../exceptions/api-error');
const {Topic, User, Opinion, FeedBack} = require('../models/models');

class OpinionService{

    async create(data){
        const opinion = await Opinion.create(data);
        return opinion;
    }

    async delete(id){
        await Opinion.destroy({
            where:{
                id:id
            }
        });
    }
    
    async getOne(id){
        const opinion = await Opinion.findByPk(id, {
            include: User,
          });
        return opinion;
    }

    async setFeedBack(id, userId, flag){
        const potentialFeedback = await FeedBack.findOne({where:{
            userId,
            opinionId: id
        }});

        const opinion = await Opinion.findByPk(id, {
            include: User,
          });

        if(potentialFeedback){
            potentialFeedback.type?opinion.agreements -= 1:opinion.disagreements -= 1;
            opinion.save();
            await FeedBack.destroy({where:{
                id: potentialFeedback.id,
            }});

            if(flag===potentialFeedback.type){
                return {feedback: null, opinion};
            }
        }


        const feedback = await FeedBack.create({
            userId,
            opinionId: id,
            type: flag
        });

        flag?opinion.agreements+=1:opinion.disagreements+=1;
        opinion.save();
        return {feedback, opinion};

    }


    async findAllByTopic(topicId, userId){
        const opinions = await Opinion.findAll({where:{
            topicId: topicId
        }, include: User});

        for (let i = 0; i < opinions.length; i++) {
            const feedback = await FeedBack.findOne({where:{
                userId,
                opinionId: opinions[i].id
            }});
            let op = JSON.parse(JSON.stringify(opinions[i]));
            op.feedback = feedback;
            opinions[i] = op;
            
        }
        return opinions;
    }

}

module.exports = new OpinionService();