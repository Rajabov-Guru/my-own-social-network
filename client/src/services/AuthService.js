import $api from '../http/index';
import SERVER_API from '../utils/apiConsts';

export default class Authservice{

    static async login(email, password){
        return $api.post(SERVER_API.LOGIN, {email, password})
    }

    static async registration(userData){
        return $api.post(SERVER_API.REGISTRATION, userData)
    }

    static async logout(){
        return $api.post(SERVER_API.LOGOUT)
    }
}