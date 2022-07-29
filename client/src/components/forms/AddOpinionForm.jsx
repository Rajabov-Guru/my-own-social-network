import React, { useContext, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import {Form, Modal, Button} from 'react-bootstrap';
import OpinionService from "../../services/OpinionService";


const AddOpinionForm = ({closeModal}) =>{
    const {store} = useContext(Context);
    const [content, setContent] = useState('');

    const saveChanges = async ()=>{
        const opinionData = {content, userId:store.user.id, topicId: store.targetTopic.id};
        const response = await OpinionService.addOpinion(opinionData);
        store.addOpinion(response.data.opinion);
        console.log(response.data.opinion);
        reset();
        closeModal();
    }
    
    const reset = ()=>{
        setContent('');
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Opinion</Form.Label>
                <Form.Control as="textarea" type="text" onChange={e=>setContent(e.target.value)} value={content}/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" onClick={saveChanges}>Добавить</Button>
            </Modal.Footer>
        </Form>
    );
}



export default observer(AddOpinionForm);