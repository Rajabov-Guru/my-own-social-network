const SERVER_API = {
    USERS: '/users',
    REGISTRATION: '/users//registration',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    USER_ISSUBSCRIBE: '/users/issubscribe',
    SUBSCRIBE: '/users/subscribe',
    UNSUBSCRIBE: '/users/unsubscribe',
    USER_CHANGEINFO: '/users/changeinfo',

    TOPICS: '/topics',
    OPINIONS: '/opinions',
    OPINION_FEEDBACK: '/opinions/feedback',

    SEND_MESSAGE: '/chat/message',

    GET_CHAT: (key1,key2)=>{
        return `/chat/${key1}/${key2}`;
    },

    USER_BY_NICK: (nick)=>{
        return `/users/${nick}`
    },

    USER_SUBSCRIPTIONS: (userId)=>{
        return `/users/${userId}/subscriptions`;
    },

    USER_SUBSCRIBERS: (userId)=>{
        return `/users/${userId}/subscribers`;
    },
    
    USER_TOPICS: (userId)=>{
        return `/users/${userId}/topics`;
    },

    OPINIONS_BY_TOPIC:(topicId, userId)=>{
        return `/topics/${topicId}/opinions/${userId}`;
    },
}
export default SERVER_API;