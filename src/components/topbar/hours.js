// import Preact from 'preact';
import style from './style';
import { h, render, Component } from 'preact';
// import React, {useState} from 'react';
// import "react-datepicker/dist/react-datepicker.css"

export default class HourStates extends Component {

    // const initalStats = [{hour: '', temp:'', precipitation:'', windR:'', pressure:''}]
    // const [stats, setStats] = useState(initalStats);

    constructor(props) {
        super(props);
        this.state = {stats : [{hour: '19:00', temp:'20c', precipitation:'100%', windR:'50km/h', pressure:'30pascals'}]};
    }


        render() {

            return (
            <div>
                <ul>
                    {this.state.stats.map(item => (
                                <li key = {item.hour}>
                                <p>{item.hour}</p>
                                <img src = {this.props.icon}/>
                                <p>{item.temp}</p>
                                <p>{item.precipitation}</p>
                                <p>{item.windR}</p>
                                <p>{item.pressure}</p>
                                </li>          
                    ))}
                </ul>
            </div>
            );
        }


};
    