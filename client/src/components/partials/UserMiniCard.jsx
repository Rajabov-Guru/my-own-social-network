import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import routeConsts from "../../utils/consts";


const UserMiniCard = ({user}) =>{

    const userProfilePath = `${routeConsts.PROFILE_ROUTE.split(':')[0]}${user.nickname}`;
    
    return (
        <Card  className="list-item shadowed">
            <Card.Body className="user_card">
                <div className="user_card_part">
                    <div className="avatar-sm" style={{backgroundImage:  "url(" + process.env.REACT_APP_URL+`/${user.avatar?user.avatar:'avatar.png'})`}}></div>
                    <Card.Title>{user.name}</Card.Title>
                </div>
                <Button as={Link} to={userProfilePath}>Открыть</Button>
            </Card.Body>
        </Card>
    );
}



export default UserMiniCard;