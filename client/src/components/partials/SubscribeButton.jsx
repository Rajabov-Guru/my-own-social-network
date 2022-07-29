import React, {useContext, useState} from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Button } from "react-bootstrap";


const SubscribeButton = ({user}) =>{
    const {store} = useContext(Context);

    

    const subscribe = async ()=>{
        store.subscribe(user.id);
        console.log('Подписался');
    }

    const unSubscribe = async ()=>{
        store.unSubscribe(user.id);
        console.log('Отписался');
    }


    return (
        !store.isSubscribe?
        <Button onClick={subscribe} variant="primary">Подписаться</Button>:
        <Button onClick={unSubscribe} variant="secondary">Вы подписаны</Button>
    );
}



export default observer(SubscribeButton);