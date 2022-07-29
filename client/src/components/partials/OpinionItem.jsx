import React, { useContext } from "react";
import { Button, Card, Container, Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import routeConsts from "../../utils/consts";
import OpinionService from "../../services/OpinionService";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const OpinionItem = ({opinion}) =>{
    const {store} = useContext(Context);
    const userPagePath = `${routeConsts.PROFILE_ROUTE.split(':')[0]}${opinion.user.nickname}`;
    
    const putFeedback = async (flag)=>{
        const feed_data = {
            id: opinion.id,
            userId:store.user.id,
            flag,
        };
        const response = await OpinionService.setFeedBack(feed_data);
        const op = {...response.data.opinion, feedback: response.data.feedback};
        store.replaceOpinion(op);
    }
    
    return (
        <Card border="primary" className="opinion-item">
            <Card.Header>
                <Container>
                    <div className="user_card_part">
                    <div className="avatar-x-sm" style={{backgroundImage:  "url(" + process.env.REACT_APP_URL+`/${opinion.user.avatar?opinion.user.avatar:'avatar.png'})`}}></div>
                        <Card.Title className="my-link" as={Link} to={userPagePath}>{opinion.user.nickname}</Card.Title>
                    </div>
                </Container>
            </Card.Header>
            <Card.Body>
                {opinion.content}
            </Card.Body>
            <Card.Footer>
                <div className="agreement-bar">
                    <Button className="feedback-btn" onClick={()=>putFeedback(true)} size="sm" variant={opinion?.feedback?.type===true?"success":"secondary"}>
                        Agree
                        <Badge bg="light" text="dark">{opinion.agreements}</Badge>
                    </Button>
                    <Button className="feedback-btn" onClick={()=>putFeedback(false)} size="sm" variant={opinion?.feedback?.type===false?"danger":"secondary"}>
                        Disagree
                        <Badge bg="light" text="dark">{opinion.disagreements}</Badge>
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}



export default observer(OpinionItem);