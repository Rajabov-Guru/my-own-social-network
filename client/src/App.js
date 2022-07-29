import React, {useEffect,useContext} from "react";
import {observer} from "mobx-react-lite";
import { BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter';
import { Context } from "./index";
import './App.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
