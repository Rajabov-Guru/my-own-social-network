import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../http";
import TopicService from "../services/TopicService";
import UserService from "../services/UserService";
import ChatService from "../services/ChatService";
import OpinionService from "../services/OpinionService";

export default class Store{
    user = {};
    targetUser = {};
    targetTopic = {};
    chat = {};
    messages = [];

    topics = [];
    sortedTopics = [];
    opinions = [];
    subscriptions = [];
    subscribers = [];

    isAuth = localStorage.getItem('isAuth')==='1'?true:false;
    isLoading =  false;
    isFeed = true;
    isSubscribe = false;

    bodyContentType = 3;
    sortOption = 'newest';

    socket = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSocket(s){
        this.socket = s;
    }

    setChat(value){
        this.chat = value;
    }

    setMessages(arr){
        this.messages = arr;
    }

    setSortOption(value){
        this.sortOption=value;
    }
    

    setBodyContentType(value){
        this.bodyContentType = value;
    }

    setSubscribers(subscribers){
        this.subscribers = subscribers;
    }

    setSubscriptions(subscriptions){
        this.subscriptions = subscriptions;
    }

    setTopics(topics){
        this.topics = topics;
    }

    setSortedTopics(sortOption){
        console.log(sortOption);
        switch (sortOption) {
            case 'newest':
                this.sortedTopics = [...this.topics].sort((a,b)=>{return Date.parse(b.createdAt)-Date.parse(a.createdAt)});
                break;
            case 'oldest':
                this.sortedTopics = [...this.topics].sort((a,b)=>{return Date.parse(a.createdAt)-Date.parse(b.createdAt)});
                break;
            case 'popular':
                this.sortedTopics = this.topics;
                break;
        }
    }

    setOpinions(opinions){
        this.opinions = opinions;
    }

    setTargetTopic(topic){
        this.targetTopic = topic;
    }

    setAuth(bool) {
        this.isAuth = bool;
        localStorage.setItem('isAuth', bool===true?'1':'0');
    };

    setUser(user) {
        this.user = user;
    }

    setTargetUser(user) {
        this.targetUser = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }
    
    setFeed(bool){
        this.isFeed = bool;
    }
    
    setIsSubscribe(bool){
        this.isSubscribe = bool;
    }

    get userByFeed(){
        return this.isFeed?this.user:this.targetUser;
    }

    async addMessage(message){
        const poten = this.messages.find((el, ind, arr)=>el.id===message.id);
        if(!poten) this.setMessages([...this.messages, message]);
    }

    async addTopic(topic){
        this.setTopics([...this.topics, topic]);
    }

    async addOpinion(opinion){
        opinion.user = this.user;
        this.setOpinions([...this.opinions, opinion]);
    }

    async fetchChat(){
        const response = await ChatService.getChat(this.user.id,this.targetUser.id);
        console.log(response.data);
        this.setChat(response.data);
    }

    async getChat(primaryKey){
        let foo = primaryKey.split('-');
        const key1 = foo[0];
        const key2 =  foo[1];
        const response = await ChatService.getChat(key1,key2);
        console.log(response.data);
        this.setChat(response.data);
        this.setMessages(this.chat.messages);
    }

    async replaceOpinion(opinion){
        this.opinions[this.opinions.indexOf(this.opinions.find(o=>o.id===opinion.id))] = opinion;
    }

    async refreshCurrentUser(){
        if(this.user.id){
            const response = await UserService.fetchUserByNick(this.user.nickname);
            const current = response.data.user;
            this.setUser(current);
        }
    }

    async getTargetUser(nickname){
        const response = await UserService.fetchUserByNick(nickname);
        const target = response.data.user;
        this.setTargetUser(target);
        return target;
    }

    async getSubscribers(id){
        
        try {
            const response = await UserService.getSubscribers(id);
            this.setSubscribers(response.data.subscribers);
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally{
            
        }
    }
    
    async getSubscriptions(id){
        
        try {
            const response = await UserService.getSubscriptions(id);
            this.setSubscriptions(response.data.subscriptions);
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally{
            
        }
    }

    async getTopics(userId){
        
        try {
            const response = await TopicService.getUserTopics(userId);
            this.setTopics(response.data.topics);
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally{
            
        }
    }

    async getTargetTopic(id){
        try{
            const response = await TopicService.getOne(id);
            this.setTargetTopic(response.data.topic);
        }catch(error){
            console.log(error.response?.data?.message);
        }
    }

    async getAllTopics(){
        
        try {
            const response = await TopicService.getAllTopics();
            this.setTopics(response.data.topics);
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally{
            
        }
    }

    async getTopicOpinions(topicId){
        try {
            const response = await OpinionService.getTopicOpinions(topicId, this.user.id);
            this.setOpinions(response.data.opinions);
        } catch (error) {
            console.log(error.response?.data?.message);
        }finally{
            
        }
    }

    async checkSubscription(id){
        if(id){
            const response = await UserService.checkSubscription(this.user.id, id);
            this.setIsSubscribe(response.data.isSubscribe);
        }
    }

    async subscribe(id){
        const response = await UserService.subscribe(this.user.id, id);
        console.log(response.data);
        this.setIsSubscribe(true);
    }

    async unSubscribe(id){
        const response = await UserService.unSubscribe(this.user.id, id);
        console.log(response.data);
        this.setIsSubscribe(false);
    }

    async login(email, password) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally{
            this.setLoading(false)
        }
    }

    async registration(userData) {
        try {
            const response = await AuthService.registration(userData);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        console.log('Check auth');
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (e) {
            this.logout();
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}