import React, { useState } from "react";

const useModal=(defaultValue)=>{
    const [show, setShow] = useState(defaultValue);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return [show, handleClose, handleShow];
}

export default useModal;