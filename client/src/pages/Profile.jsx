import React, {useContext, useEffect, useState } from "react";
import {observer} from "mobx-react-lite";
import { Context } from "../index";
import {useNavigate, useParams} from 'react-router-dom';
import routeConsts from "../utils/consts";
import ProfileInfo from "../components/ProfileInfo";
import Loading from '../components/Loading';
import { Col, Container, Row} from "react-bootstrap";
import TopicList from "../components/lists/TopicList";
import UsersList from "../components/lists/UsersList";
import PageContainer from "../components/common/PageContainer";
import SortSelect from "../components/partials/SortSelect";


const Profile = ({feed}) =>{
    const {nickname} = useParams();
    const router = useNavigate();
    const {store} =useContext(Context);
    
    
    useEffect(() => {
        if(!feed) fetchUser();
        store.setFeed(feed);
    }, [feed, store.isSubscribe])

    useEffect(() => {
        store.getTopics(store.userByFeed.id);
        store.setBodyContentType(3);
        store.setSortOption('newest');
    }, [feed, store.targetUser])

    useEffect(()=>{
        store.refreshCurrentUser();
    },[store.topics]);

    useEffect(()=>{
        switch (store.bodyContentType) {
            case 1:
                store.getSubscriptions(store.userByFeed.id);
                break;
            case 2:
                store.getSubscribers(store.userByFeed.id);
                break;
            case 3:
                store.getTopics(store.userByFeed.id);
                break;
        }
        
    },[store.bodyContentType, store.targetUser, feed]);

    useEffect(()=>{
        store.setSortedTopics(store.sortOption);
    },[store.sortOption, store.topics]);
    

    const fetchUser= async ()=>{
        const secondUser = await store.getTargetUser(nickname);
        if(!secondUser){
            return router(routeConsts.FEED);
        }
        //store.fetchChat();
    }
    
    const handleSortChange = (option)=>{
        store.setSortOption(option);
    }
    
    if(store.isLoading){
        return (
            <Loading/>
        );
    }
    

    return (
        <PageContainer>
            <Row>
                <Col className="left-col" xs={3}>
                    <ProfileInfo user={store.userByFeed}/>
                </Col>
                <Col>
                    {store.bodyContentType===1?
                        <UsersList list={store.subscriptions}/>:
                    store.bodyContentType===2?
                        <UsersList list={store.subscribers}/>:
                        <>
                            <SortSelect title="Топики" value={store.sortOption} handleChange={handleSortChange}/>
                            <TopicList topics={store.sortedTopics}/>
                        </>
                    }
                </Col>
            </Row>
        </PageContainer>
    );
}



export default observer(Profile);