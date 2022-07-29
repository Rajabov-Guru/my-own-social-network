import $api from "../http";
import SERVER_API from "../utils/apiConsts";


export default class TopicService {
    static createTopic(topicData){
        return $api.post(SERVER_API.TOPICS, topicData);
    }
    
    static getUserTopics(userId){
        return $api.get(SERVER_API.USER_TOPICS(userId));
    }

    static getAllTopics(){
        return $api.get(SERVER_API.TOPICS);
    }

    static getOne(id){
        return $api.get(`${SERVER_API.TOPICS}/${id}`);
    }
}