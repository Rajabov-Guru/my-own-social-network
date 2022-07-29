import React, { useContext, useEffect } from "react";
import PageContainer from "../components/common/PageContainer";
import { useParams } from "react-router-dom";
import AddOpinionModal from "../components/modals/AddOpinionModal";
import useModal from "../hooks/useModal";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Loading from "../components/Loading";
import OpinionList from "../components/lists/OpinionList";
import TopicPageCard from "../components/partials/TopicPageCard";

const TopicPage = (props) =>{
    const {store} = useContext(Context);
    const {topicId} = useParams();
    const [AddOpinionModalStatus, AddOpinionModalClose, AddOpinionModalShow ] = useModal(false);
    
    useEffect(()=>{
        store.getTargetTopic(topicId);
        store.getTopicOpinions(topicId);
    },[]);

    if(store.isLoading){
        return  (
            <Loading/>
        );
    }

    return (
        <PageContainer>
            <AddOpinionModal status={AddOpinionModalStatus} handleClose={AddOpinionModalClose}/>
            <TopicPageCard topic={store.targetTopic} AddOpinionModalShow={AddOpinionModalShow}/>
            <OpinionList/>
        </PageContainer>
    );
}



export default observer(TopicPage);