const chatService = require('../services/chat-service');


class ChatController{
    async create(req, res, next){
        try {
            const {key1, key2} = req.body;
            const chat = await chatService.create(key1, key2);
            return res.json(chat);
        } catch (error) {
            next(error)
        }
    }

    async getByUsers(req, res, next){
        try {
            const {key1, key2} = req.params;
            const chat = await chatService.getOne(key1, key2);
            return res.json(chat);
        } catch (error) {
            next(error)
        }
    }

    async addMessage(req, res, next){
        try {
            const {userId, chatId, text} = req.body;
            const message = await chatService.addMessage(userId, chatId, text);
            return res.json(message);
        } catch (error) {
            next(error)
        }
    }



    

}

module.exports = new ChatController();