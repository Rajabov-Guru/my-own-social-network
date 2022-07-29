import React, { useContext } from "react";
import OpinionItem from "../partials/OpinionItem";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const OpinionList = (props) =>{
    const {store} = useContext(Context);
    return (
        <div className="op-list">
            {store.opinions.map(op=>
                <OpinionItem key={op.id} opinion={op}/>
            )}
        </div>
    );
}



export default observer(OpinionList);