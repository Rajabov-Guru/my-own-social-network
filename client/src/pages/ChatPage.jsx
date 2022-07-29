import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import { Card, Button, Container, Form } from "react-bootstrap";
import { Context } from "..";
import { useContext } from "react";
import { Link } from "react-router-dom";
import routeConsts from "../utils/consts";
import { useState } from "react";
import { useEffect } from "react";
import MessageList from "../components/lists/MessageList";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import ChatService from "../services/ChatService";

const ChatPage = (props) =>{
    
    const {store} = useContext(Context);
    const {chatId, nickname} = useParams();
    const message = useRef();

    useEffect(()=>{
        console.log("MOUNT");
        store.getTargetUser(nickname);
        store.getChat(chatId);
        if(!store.socket){
            const socket = new WebSocket("ws://localhost:5000/api/message");

            socket.onopen = ()=> {
                console.log("Соединение установлено.");
                const mes = {
                    method: 'connection',
                    id:chatId
                };
                socket.send(JSON.stringify(mes));
            };

            socket.onmessage = (event)=> {
                const mes = JSON.parse(event.data);
                store.addMessage(mes);
                console.log(mes);
                
            };

            socket.onclose = (event)=>{
                console.log('Соединение закрыто');
            };
            socket.onerror = (error)=> {
                console.log("Ошибка " + error.message);
            };

            store.setSocket(socket);
        }
        
    },[]);

    
    const sendMessage = async()=>{
        const data = {
            text: message.current.value,
            userId: store.user.id,
            chatId
        };
        const response = await ChatService.sendMes(data);
        const mes = response.data;
        mes.method = 'data';
        store.socket.send(JSON.stringify(mes));
        message.current.value = '';
    }



    const userPagePath = `${routeConsts.PROFILE_ROUTE.split(':')[0]}${store.targetUser.nickname}`;
    return (
        <PageContainer>
           <Card className="chat">
                <Card.Header>
                    <Container>
                        <div className="user_card_part">
                        <div className="avatar-x-sm" style={{backgroundImage:  "url(" + process.env.REACT_APP_URL+`/${store.targetUser.avatar?store.targetUser.avatar:'avatar.png'})`}}></div>
                            <Card.Title className="my-link" as={Link} to={userPagePath}>{store.targetUser.nickname}</Card.Title>
                        </div>
                    </Container>
                </Card.Header>
                <Card.Body className="message-area">
                    <MessageList messages={store.messages}/>
                    <Form className="d-flex new-message">
                        <Form.Control ref={message}  type="text" placeholder="Сообщение" className="me-2" aria-label="Сообщение"/>
                        <Button variant="primary" onClick={sendMessage}>Отправить</Button>
                    </Form>
                </Card.Body>
           </Card> 
        </PageContainer>
    );
}



export default observer(ChatPage);