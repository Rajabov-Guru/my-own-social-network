const ApiError = require('../exceptions/api-error');
const {Chat, Message} = require('../models/models');
const {Op} = require('sequelize')

class ChatService{

    async create(key1, key2){
        const primaryKey = `${key1}-${key2}`;
        const chat = await Chat.create({id:primaryKey});
        return chat;
    }

    
    async getOne(key1, key2){
        const primaryKey1 = `${key1}-${key2}`;
        const primaryKey2 = `${key2}-${key1}`;
        let chat =  await Chat.findOne({
            where:{
                id:{
                    [Op.or]: [primaryKey1, primaryKey2]
                }
            },
            include: Message
        });

        if(!chat){
            chat =  await Chat.create({id:primaryKey1});
        }

        return chat;
    
    }

    async addMessage(userId, chatId, text){
        const message = await Message.create({userId, chatId, text});
        return message;
    }

    
}

module.exports = new ChatService();