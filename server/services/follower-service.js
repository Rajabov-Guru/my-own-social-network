const ApiError = require('../exceptions/api-error');
const {Follower, User} = require('../models/models');

class FollowerService{

    async create(data){
        const check = await Follower.findOne({
            where:{
                userId: data.userId,
                secondUserId: data.secondUserId
            }
        });
        if(check){
            throw ApiError.AlreadySubscribe();
        }
        const follower = await Follower.create(data);
        return follower;
    }

    async delete(id, userId, secondUserId){
        await Follower.destroy({
            where:{
                id:id
            }
        });
    }
    
    async getOne(id){
        const follower = await Follower.findByPk(id);
        return follower;
    }

    async findByUser(data){
        const follower = await Follower.findOne({where:{
            userId: data.userId,
            secondUserId: data.secondUserId
        }});
        return follower;
    }

    async findAllByUser(userId){
        const followers = await Follower.findAll({where:{
            userId: userId
        }});
        return followers;
    }

    async findAllBySecondUser(id){
        const followers = await Follower.findAll({where:{
            secondUserId: id
        }});
        return followers;
    }
}

module.exports = new FollowerService();