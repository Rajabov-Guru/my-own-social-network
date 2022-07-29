import React, { useContext,useEffect } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { Context } from "../index";
import {publicRoutes, privateRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import Loading from "./Loading";
import routeConsts from "../utils/consts";

const AppRouter = (props) =>{
    const {store} = useContext(Context);
    
    useEffect(()=>{
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    },[]);

    if(store.isLoading){
        return (
            <Loading/>
        );
    }


    if(store.isAuth === true){
        return (
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={Date.now()} path={route.path} element={<route.Component {...route.props}/>}/>
                ) }
                <Route path={`/profile/${store.user.nickname}`} element={<Navigate to={routeConsts.FEED}/>} />
                <Route path="/*" element={<Navigate to={routeConsts.FEED}/>} />
            </Routes>
        );
    }
    else{
        return (
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={Date.now()} path={route.path} element={<route.Component/>}/>
                )}
                <Route path="/*" element={<Navigate to={routeConsts.LOGIN_ROUTE}/>} />
            </Routes>
        );
    }
}



export default observer(AppRouter);