import React, { useContext } from "react";
import {Button, ListGroupItem, Badge } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const StatItem = ({title, count, bodyType}) =>{
    const {store} = useContext(Context);

    const setBodyContentType = () => {
        store.setBodyContentType(bodyType);
    }


    return (
        <ListGroupItem className="info-bar">
            <strong>{title}</strong>
            <Badge as={Button} onClick={setBodyContentType}>{count}</Badge>
        </ListGroupItem>
    );
}



export default observer(StatItem);