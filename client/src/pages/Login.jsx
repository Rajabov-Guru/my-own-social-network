import React, {useContext, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import Loading from "../components/Loading";
import routeConsts from "../utils/consts";


const Login = (props) =>{
    const router = useNavigate();
    const {store} = useContext(Context);

    const [validated, setValidated] = useState(false);
    const [loginData, setLoginData] = useState({email:'', password:''});

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        await store.login(loginData.email, loginData.password);
        router(routeConsts.FEED);
    };

    if(store.isLoading){
        return (
            <Loading/>
        );
    }
    

    return (
        <div className="CenterPage">
            <h1 className="form-title">Вход</h1>
            <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={loginData.email} onChange={e=>setLoginData({...loginData, email: e.target.value})} type="email" placeholder="email" required />
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли почту</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control value={loginData.password} onChange={e=>setLoginData({...loginData, password: e.target.value})} type="password" placeholder="Пароль" required/>
                    <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Забыли пароль</Form.Control.Feedback>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Вход
                </Button>

                <Form.Text muted className="end-message-form">
                    Нету аккаунта? <strong className="navigate" onClick={()=>router(routeConsts.REGISTRATION_ROUTE)}>Зарегистрироваться</strong>
                </Form.Text>
            </Form>
        </div>
    );
}



export default observer(Login);