// import Preact from 'preact';
import style from './style.less';

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

            <div class = {style.hours}>
                <ul>
                    {this.state.stats.map(item => (
                                <li key = {item.hour}>
                                    <img src = {this.props.icon} class = {style.item}/>
                                    <p class = {style.item}>{item.temp}</p>
                                    <p class = {style.item}>{item.precipitation}</p>
                                    <p class = {style.item}>{item.windR}</p>
                                    <p class = {style.item}>{item.pressure}</p>
                                    <p class = {style.item} >{item.hour}</p>
                                </li>
                    ))}
                </ul>
            </div>
		);
	}


}
