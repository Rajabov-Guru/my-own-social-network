import React from "react";
import MyModal from "../common/MyModal";
import ChangeProfileForm from "../forms/ChangeProfileForm";


const ChangeProfileModal = ({status, handleClose}) =>{
    return (
        <MyModal title={"Редактирование профиля"} status={status} handleClose={handleClose}>
            <ChangeProfileForm closeModal={handleClose}/>
        </MyModal>
    );
}



export default ChangeProfileModal;