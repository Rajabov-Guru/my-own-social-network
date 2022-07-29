import React from "react";
import Message from "../partials/Message";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const MessageList = ({messages}) =>{
    const {store} = useContext(Context);
    const fake_messages = [
        {id:1, text: 'Hello'},
        {id:2, text: 'Hi'},
        {id:1, text: 'My name is Afros'},
        {id:2, text: 'I am Mark'},
        
    ];

    return (
        <div className="messages">
            {store.messages.map(mes=>
                <Message key={mes.id} mes={mes} side={mes.userId===store.user.id?'right':'left'}/>
            )}
        </div>
    );
}



export default observer(MessageList);