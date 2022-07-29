import React from "react";
import { Container } from "react-bootstrap";
import TopicItem from "../partials/TopicItem";


const TopicList = ({topics}) =>{

    if(!topics.length){
        return (
            <Container>
                <h3>Список пуст</h3>
            </Container>
        );
    }

    return (
        <Container>
            {topics.map(topic=>
                <TopicItem key={topic.id} topic={topic}/>
            )}
        </Container>
    );
}



export default TopicList;