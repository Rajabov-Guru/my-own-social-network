import React, {useState, useContext} from "react";
import {Form, Modal, Button} from 'react-bootstrap';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import UserService from "../../services/UserService";


const ChangeProfileForm = ({closeModal}) =>{
    const {store} = useContext(Context);

    const [name, setName] = useState(store.user.name);
    const [status, setStatus] = useState(store.user.status);
    const [about, setAbout] = useState(store.user.about);
    const [file, setFile] = useState(null)

    const saveChanges = async ()=>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status);
        formData.append('about', about);
        formData.append('id', store.user.id);
        formData.append('avatar', file);
        // const profileData = {name, status, about, id: store.user.id};
        const response = await UserService.changeInfo(formData);
        store.setUser(response.data.user);
        reset();
        closeModal();
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const reset= ()=>{
        setName(store.user.name);
        setStatus(store.user.status);
        setAbout(store.user.about);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" onChange={e=>setName(e.target.value)} value={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Статус</Form.Label>
                <Form.Control type="text" onChange={e=>setStatus(e.target.value)} value={status} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Пару слов о себе</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e=>setAbout(e.target.value)} value={about}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Фотография профиля</Form.Label>
                <Form.Control type="file" onChange={selectFile}/>
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" onClick={saveChanges}>Сохранить изменения</Button>
            </Modal.Footer>
        </Form>
    );
}



export default observer(ChangeProfileForm);