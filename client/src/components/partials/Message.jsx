import React from "react";
import { Card } from "react-bootstrap";


const Message = ({mes,side}) =>{
    return (
        <div className={['message-wrapper', side].join(' ')}>
            <Card className="message" bg={side==='right'?'primary':'secondary'} text={'light'}>
                <Card.Body className="message-content">
                    {mes.text}
                </Card.Body>
            </Card>
        </div>
    );
}



export default Message;