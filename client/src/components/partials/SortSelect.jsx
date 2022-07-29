import React, {useState} from "react";
import { Container, Form } from "react-bootstrap";


const SortSelect = ({title, value, handleChange}) =>{
    const onSortOptionChange = (selSort)=>{
        handleChange(selSort.target.value);
    }

    return (
        <Container className="toolbar">
            <h5>{title}</h5>
            <Form.Select className="tool-select" value={value} onChange={onSortOptionChange}>
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
                <option value="popular">Сначала популярные</option>
            </Form.Select>
        </Container>
    );
}



export default SortSelect;