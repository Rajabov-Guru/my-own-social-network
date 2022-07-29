import React from "react";
import MyModal from "../common/MyModal";
import AddOpinionForm from "../forms/AddOpinionForm";


const AddOpinionModal = ({status, handleClose}) =>{
    
    return (
        <MyModal title={"Ваше мнение"} status={status} handleClose={handleClose}>
            <AddOpinionForm closeModal={handleClose}/>
        </MyModal>
    );
}



export default AddOpinionModal;