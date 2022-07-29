import React, {useContext, useState} from "react";
import {Form, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import Loading from "../components/Loading";
import routeConsts from "../utils/consts";


const Registration = (props) =>{
    const router = useNavigate();

    const [userData, setUserData] = useState({name:'', nickname:'', email:'', password:''});
    const [validated, setValidated] = useState(false);
    const {store} = useContext(Context);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        await store.registration(userData);
        console.log(store.user);
        router(routeConsts.LOGIN_ROUTE);
    };

    if(store.isLoading){
        return (
            <Loading/>
        );
    }

    
    return (
        <div className="CenterPage">
            <h1 className="form-title">Регистрация</h1>
            <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control value={userData.name} onChange={e=>setUserData({...userData, name:e.target.value})}  type="text" placeholder="Имя" required/>
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли имя</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNickname">
                    <Form.Control value={userData.nickname} onChange={e=>setUserData({...userData, nickname:e.target.value})} type="text" placeholder="Ник" required/>
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли никнейм</Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    Твой уникальный идентификатор
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={userData.email} onChange={e=>setUserData({...userData, email:e.target.value})} type="email" placeholder="email" required/>
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли почту</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})} type="password" placeholder="Пароль" required/>
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли пароль</Form.Control.Feedback>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Регистрация
                </Button>
                <Form.Text muted className="end-message-form">
                    Есть аккаунт? <strong className="navigate" onClick={()=>router(routeConsts.LOGIN_ROUTE)}>Войти</strong>
                </Form.Text>
            </Form>
        </div>
    );
}



export default observer(Registration);