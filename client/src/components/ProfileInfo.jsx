import React, { useContext, useEffect, useState } from "react";
import {Accordion, Card } from "react-bootstrap";
import {observer} from "mobx-react-lite";
import useModal from "../hooks/useModal";
import StatisticBar from "./partials/StatisticBar";
import ProfileControl from "./partials/ProfileControl";
import ChangeProfileModal from "./modals/ChangeProfileModal";
import AddTopicModal from "./modals/AddTopicModal";
import { Context } from "..";


const ProfileInfo = ({user}) =>{
    const {store}  = useContext(Context);

    const [changeModalStatus, changeModalClose, changeModalShow] = useModal(false); //Это мой первый кастомный хук
    const [addModalStatus, addModalClose, addModalShow] = useModal(false);
    
    return (
        <Card className="profile-card">
        
            <div className="info-bar">
                <div className="avatar" style={{backgroundImage:  "url(" + process.env.REACT_APP_URL+`/${user.avatar?user.avatar:'avatar.png'}`  + ")"}}  />
            </div>
            
            <Card.Body>
                <Card.Title className="card-title2">{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted card-title2">Status: {user.status}</Card.Subtitle>
            </Card.Body>
            
            <StatisticBar user={user}/>
            
            <Card.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>О себе</Accordion.Header>
                        <Accordion.Body className="acc-body">{user.about}</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <ProfileControl changeModalShow={changeModalShow} addModalShow={addModalShow} user={user}/>
            
            </Card.Body>
            
            <ChangeProfileModal status={changeModalStatus} handleClose={changeModalClose}/>
            <AddTopicModal status={addModalStatus} handleClose={addModalClose}/>
            
        </Card>
    );
}



export default observer(ProfileInfo);