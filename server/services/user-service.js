const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {

    async registration(userData){
        const candidate = await User.findOne({where:{email:userData.email}});
        if(candidate){
            throw ApiError.BadRequest(`A: User with email ${userData.email} already exist`);
        }
        const hashPassword = await bcrypt.hash(userData.password,3);
        const activationLink = uuid.v4();
        const user = await User.create({email:userData.email, password: hashPassword, activationLink, name:userData.name, nickname: userData.nickname});
        await mailService.sendActivationMail(userData.email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
        const user_dto = new UserDto(user);
        const tokens = tokenService.generateTokens({...user_dto});
        await tokenService.saveToken(user_dto.id, tokens.refreshToken);

        return { ...tokens, user: user,};
    }

    async activate(activationLink) {
        const user = await User.findOne({where:{activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        await user.update({isActivate:true});
        
    }

    async login(email, password) {
        const user = await User.findOne({where:{email}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: user}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: user}
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    async getUserByNick(nickname){
        const user = await User.findOne({where:{nickname}});
        return user;
    }

    async getUserById(id){
        const user = await User.findByPk(id);
        return user;
    }

    async update(userData){
        if(!userData.avatar){
            delete userData.avatar;
        }
        const user = await User.findByPk(userData.id);
        await user.update(userData);
        await user.save();
        return user;
    }

    //test

    async changeSubscriptions(data, bool){
        const firstUser = await User.findByPk(data.userId);
        firstUser.subscriptions += bool?1:-1;
        firstUser.save();
        const secondUser = await User.findByPk(data.secondUserId);
        secondUser.subscribers += bool?1:-1;
        secondUser.save();
    }

    async changeTopicsCount(userId, bool){
        const user = await User.findByPk(userId);
        user.topicCount += bool?1:-1;
        user.save();
    }
}

module.exports = new UserService();