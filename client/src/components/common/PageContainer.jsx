import React from "react";
import MainNavbar from "./MainNavbar";
import { Container, Row } from "react-bootstrap";

const PageContainer = ({children}) =>{
    return (
        <Container className="page" fluid='sm'>
            <MainNavbar/>
            {children}
        </Container>
    );
}



export default PageContainer;