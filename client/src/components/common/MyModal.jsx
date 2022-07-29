import React from "react";
import {Modal} from 'react-bootstrap';


const MyModal = ({status, handleClose, title, children}) =>{

  const closeModal=()=>{
    handleClose();
  }

  return (
      <Modal show={status} onHide={closeModal}>
      
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>

      </Modal>
  );
}



export default MyModal;