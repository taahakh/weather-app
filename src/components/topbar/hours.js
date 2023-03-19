import Preact from 'preact';
import style from './style';
import React, {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css"

const HourStates = (props) => {

    const initalStats = [{hour: '', temp:'', precipitation:'', windR:'', pressure:''}]
    const [stats, setStats] = useState(initalStats);

    return (
        <div>
            <ul>
                {stats.map(item => (
                            <li key = {item.hour}>
                            <p>{item.hour}</p>
                            <img src = {props.icon}/>
                            <p>{item.temp}</p>
                            <p>{item.precipitation}</p>
                            <p>{item.windR}</p>
                            <p>{item.pressure}</p>
                        </li>          
                    ))}
            </ul>
        </div>
    );
};

export default HourStates;
    