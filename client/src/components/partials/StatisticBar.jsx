import React from "react";
import { ListGroup} from "react-bootstrap";
import StatItem from "./StatItem";


const StatisticBar = ({user}) =>{
    return (
        <ListGroup horizontal className="list-group-flush">
            <StatItem title={'Подписки'} count={user.subscriptions} bodyType={1}/>
            <StatItem title={'Подписчики'} count={user.subscribers} bodyType={2}/>
            <StatItem title={'Топики'} count={user.topicCount} bodyType={3}/>
        </ListGroup>
    );
}



export default StatisticBar;