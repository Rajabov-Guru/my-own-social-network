const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { STRING } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    isActivate: {type:DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type:DataTypes.STRING},
    name: {type: DataTypes.STRING},
    nickname: {type: DataTypes.STRING, unique: true},
    about: {type: DataTypes.TEXT, defaultValue:''},
    status: {type:DataTypes.STRING, defaultValue:''},
    avatar: {type:DataTypes.STRING, defaultValue:'avatar.png'},
    subscriptions:{type:DataTypes.INTEGER, defaultValue:0},
    subscribers:{type:DataTypes.INTEGER, defaultValue:0},
    topicCount:{type:DataTypes.INTEGER, defaultValue:0},
})

const Topic = sequelize.define('topic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING, allowNull: false},
    description: {type:DataTypes.TEXT},
})

const Opinion = sequelize.define('opinion', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type:DataTypes.TEXT, allowNull: false},
    agreements: {type:DataTypes.INTEGER, defaultValue: 0},
    disagreements: {type:DataTypes.INTEGER, defaultValue: 0}
})

const Follower = sequelize.define('follower', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    secondUserId: {type: DataTypes.INTEGER, allowNull: false},
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

const FeedBack = sequelize.define('feedbacks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.BOOLEAN},
})

const Chat = sequelize.define('chats', {
    id: {type: DataTypes.STRING, primaryKey: true},
})

const Message = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT},
})


User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Topic);
Topic.belongsTo(User);

User.hasMany(Opinion);
Opinion.belongsTo(User);

Topic.hasMany(Opinion);
Opinion.belongsTo(Topic);

User.hasMany(Follower);
Follower.belongsTo(User);

User.hasMany(FeedBack);
FeedBack.belongsTo(User);

Opinion.hasMany(FeedBack);
FeedBack.belongsTo(Opinion);

//

User.hasMany(Message);
Message.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

module.exports = {
    User,
    Topic,
    Opinion,
    Follower,
    Token,
    FeedBack,
    Chat,
    Message
}