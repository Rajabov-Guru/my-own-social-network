import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import routeConsts from "../../utils/consts";


const TopicItem = ({topic}) =>{
    const router = useNavigate();
    const topicPagePath = `${routeConsts.LENTA}/${topic.id}`;
    return (
        <Card border="primary"  className="list-item" >
            <Card.Header as="h5">{topic.title}</Card.Header>
            <Card.Body>
                <Card.Text>{topic.description}</Card.Text>
                <Button onClick={()=>router(topicPagePath)} variant="primary">Открыть</Button>
            </Card.Body>
        </Card>
    );
}



export default TopicItem;