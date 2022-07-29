import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import TopicList from "../components/lists/TopicList";
import PageContainer from "../components/common/PageContainer";
import SortSelect from "../components/partials/SortSelect";

const Lenta = (props) =>{
    const {store} = useContext(Context);
    
    useEffect(()=>{
        store.getAllTopics();
        store.setSortOption('newest');
    },[]);

    useEffect(()=>{
        store.setSortedTopics(store.sortOption);
    },[store.sortOption, store.topics]);

    const handleSortChange = (option)=>{
        store.setSortOption(option);
    }

    return (
        <PageContainer>
            <SortSelect title={'Лента'} value = {store.sortOption} handleChange={handleSortChange}/>
            <TopicList topics={store.sortedTopics}/>
        </PageContainer>
    );
}



export default observer(Lenta);