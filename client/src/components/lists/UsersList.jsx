import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import UserMiniCard from "../partials/UserMiniCard";


const UsersList = ({list}) =>{


    if(!list.length){
        return (
            <Container>
                <h3>Список пуст</h3>
            </Container>
        );
    }

    return (
        <Container>
            {list.map(subs=>
                    <UserMiniCard key={subs.id} user={subs}/>
            )}
            
        </Container>
    );
}



export default UsersList;