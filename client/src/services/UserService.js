import $api from "../http";
import SERVER_API from "../utils/apiConsts";


export default class UserService {
    static fetchUsers(){
        return $api.get(SERVER_API.USERS)
    }

    static fetchUserByNick(nick){
        return $api.get(SERVER_API.USER_BY_NICK(nick));
    }

    static checkSubscription(userId,secondUserId){
        return $api.post(SERVER_API.USER_ISSUBSCRIBE,{
            userId,
            secondUserId,
        });
    }

    static subscribe(userId,secondUserId){
        return $api.post(SERVER_API.SUBSCRIBE,{
            userId,
            secondUserId,
        });
    }

    static unSubscribe(userId,secondUserId){
        return $api.post(SERVER_API.UNSUBSCRIBE,{
            userId,
            secondUserId,
        });
    }

    static changeInfo(userData){
        return $api.post(SERVER_API.USER_CHANGEINFO, userData);
    }

    static getSubscriptions(userId){
        return $api.get(SERVER_API.USER_SUBSCRIPTIONS(userId));
    }

    static getSubscribers(userId){
        return $api.get(SERVER_API.USER_SUBSCRIBERS(userId));
    }
}