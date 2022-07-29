import React from "react";
import { Spinner } from "react-bootstrap";


const Loading = (props) =>{
    return (
        <div className="CenterPage">
            <Spinner animation="grow" variant="info" />
        </div>
    );
}



export default Loading;