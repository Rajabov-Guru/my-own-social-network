import React from "react";
import { Card, Button } from "react-bootstrap";


const TopicPageCard = ({topic, AddOpinionModalShow}) =>{
    return (
        <Card className="text-center topic-page-header shadowed">
            {/* <Card.Header>Featured</Card.Header> */}
            <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>{topic.description}</Card.Text>
                <Button onClick={AddOpinionModalShow} variant="primary">Добавить мнение</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{topic.createdAt}</Card.Footer>
        </Card>
    );
}



export default TopicPageCard;