import React, {useContext, useEffect} from "react";
import ButtonsBar from "../common/ButtonsBar";
import { Button} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import SubscribeButton from "./SubscribeButton";
import { useNavigate } from "react-router-dom";
import routeConsts from "../../utils/consts";

const ProfileControl = ({changeModalShow,addModalShow, user}) =>{
    const router = useNavigate();
    const {store} = useContext(Context);

    useEffect(()=>{
        if(!store.isFeed){
            store.checkSubscription(user.id);
        }
    },[user]);

    const testChat = async ()=>{
        await store.fetchChat();
        let path = `${routeConsts.CHAT_ROUTE.split(':')[0]}${store.chat.id}/${store.targetUser.nickname}`;
        return router(path);
    }

    return (
        <div>
            {store.isFeed?
                <ButtonsBar>
                    <Button size="sm" onClick={addModalShow} variant="success">Добавить топик</Button>
                    <Button size="sm" onClick={changeModalShow} variant="info">Редактировать профиль</Button>
                    <Button size="sm" onClick={()=>store.logout()} variant="danger">Выйти</Button>
                </ButtonsBar>:
                <ButtonsBar>
                    <Button variant="info" onClick={testChat}>Написать</Button>
                    <SubscribeButton user={user}/>
                </ButtonsBar>
            }
        </div>
    );
}



export default observer(ProfileControl);