import React from "react";
import {Col, Container, Row } from "react-bootstrap";


const ButtonsBar = ({children}) =>{
    return (
        <Container>
            <Row className="btn-bar">
                {children}
            </Row>
        </Container>
    );
}



export default ButtonsBar;