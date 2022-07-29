const userService = require('../services/user-service');
const followerService = require('../services/follower-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const topicService = require('../services/topic-service');
const uuid = require('uuid');
const path = require('path');


class UserController {
    async changeInfo(req, res, next){
        try {
            console.log(JSON.stringify(req.body));
            const {id,name, status, about} = req.body; 
            if(req.files){
                const {avatar} = req.files;
                var fileName = uuid.v4() + ".jpg";
                avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            const updatedUser = await userService.update({id,name, status, about, avatar: fileName});
            return res.json({user:updatedUser});
        } catch (error) {
            next(error)
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const potentialUser  = req.body;
            const userData = await userService.registration(potentialUser);
            res.cookie('refreshToken',userData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly:true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if(!refreshToken){
                return res.status(200).json({message:'Пользователь уже вышел'});
            }
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserByNick(req, res, next){
        try {
            const {nickname} = req.params;
            const user = await userService.getUserByNick(nickname);
            return res.json({user});
        } catch (error) {
            next(error);
        }
    }

    async subscribe(req, res, next){
        try {
            const {userId, secondUserId} = req.body;
            const follower = await followerService.create({userId, secondUserId});
            await userService.changeSubscriptions({userId, secondUserId}, true);
            return res.json({follower});
        } catch (error) {
            next(error)
        }
    }
    
    async unSubscribe(req, res, next){
        try {
            const {userId, secondUserId} = req.body;
            const follower = await followerService.findByUser({userId,secondUserId});
            await followerService.delete(follower.id);
            await userService.changeSubscriptions({userId, secondUserId}, false);
            return res.json({follower});
        } catch (error) {
            next(error)
        }
    }

    async isSubscribe(req, res, next){
        try {
            const {userId, secondUserId} = req.body;
            const follower = await followerService.findByUser({userId,secondUserId});
            return follower?res.json({isSubscribe:true}):res.json({isSubscribe:false});
        } catch (error) {
            next(error)
        }
    }

    async getTopics(req, res, next){
        try {
            const {userId} = req.params;
            const topics = await topicService.getTopicsByUserId(userId);
            return res.json({topics});
        } catch (error) {
            next(error)
        }
    }

    async getSubscriptions(req,res,next){
        try {
            const {userId} = req.params;
            const followers = await followerService.findAllByUser(userId);
            const subscriptions = [];
            for (let i = 0; i < followers.length; i++) {
                const subscription = await userService.getUserById(followers[i].secondUserId);
                subscriptions.push(subscription);
            }
            return res.json({subscriptions});
        } catch (error) {
            next(error)
        }
    }

    async getSubscribers(req,res,next){
        try {
            const {userId} = req.params;
            const followers = await followerService.findAllBySecondUser(userId);
            const subscribers = [];
            for (let i = 0; i < followers.length; i++) {
                const subscriber = await userService.getUserById(followers[i].userId);
                subscribers.push(subscriber);
            }
            return res.json({subscribers});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()