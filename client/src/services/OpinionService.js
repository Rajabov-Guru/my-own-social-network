import $api from "../http";
import SERVER_API from "../utils/apiConsts";


export default class OpinionService {
    static addOpinion(opinionData){
        return $api.post(SERVER_API.OPINIONS, opinionData);
    }
    
    static getTopicOpinions(topicId, userId){
        return $api.get(SERVER_API.OPINIONS_BY_TOPIC(topicId, userId));
    }

    static getOne(id){
        return $api.get(`${SERVER_API.OPINIONS}/${id}`);
    }

    static setFeedBack(data){
        return $api.post(SERVER_API.OPINION_FEEDBACK, data);
    }

}