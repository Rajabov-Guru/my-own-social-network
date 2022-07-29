import React from "react";
import MyModal from "../common/MyModal";
import AddTopicForm from "../forms/AddTopicForm";



const AddTopicModal = ({status, handleClose}) =>{
    return (
        <MyModal title={"Добавление топика"} status={status} handleClose={handleClose}>
            <AddTopicForm closeModal={handleClose}/>
        </MyModal>
    );
}



export default AddTopicModal;