import React, {useState, useContext} from "react";
import {Form, Modal, Button} from 'react-bootstrap';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import TopicService from "../../services/TopicService";


const AddTopicForm = ({closeModal}) =>{
    const {store} = useContext(Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveChanges = async ()=>{
        const topicData = {title, description, userId:store.user.id};
        const response = await TopicService.createTopic(topicData);
        console.log(response.data.topic);
        store.addTopic(response.data.topic);
        reset();
        closeModal();
    }
    const reset = ()=>{
        setTitle('');
        setDescription('');
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control type="text" onChange={e=>setTitle(e.target.value)} value={title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Описание</Form.Label>
                <Form.Control type="text" onChange={e=>setDescription(e.target.value)} value={description} />
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" onClick={saveChanges}>Добавить</Button>
            </Modal.Footer>
        </Form>
    );
}



export default observer(AddTopicForm);