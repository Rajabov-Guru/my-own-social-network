import $api from "../http";
import SERVER_API from "../utils/apiConsts";


export default class ChatService {
    static getChat(key1,key2){
        return $api.get(SERVER_API.GET_CHAT(key1,key2));
    }

    static sendMes(message){
        return $api.post(SERVER_API.SEND_MESSAGE, message);
    }
    

}