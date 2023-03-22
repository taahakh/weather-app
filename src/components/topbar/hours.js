// import Preact from 'preact';
import style from './style.less';

import { h, render, Component } from 'preact';
// import React, {useState} from 'react';
// import "react-datepicker/dist/react-datepicker.css"


export default class HourStates extends Component {

	constructor(props) {
		super(props);
		this.state = {stats : [{hour: '19:00', temp:'20c', precipitation:'100%', windR:'50km/h', pressure:'30pascals'}]};
	}


	render() {

		return (
			<div class={style.hours}>
				<button class={style.transitionButton} onClick={this.props.switch}>Daily Summary</button>
				<ul>
					{this.props.info !== undefined ?
						this.props.info.map(item => (
							<li key={item.hour} class={style.hoursInner}>
								<img src={item.pic} width="30" height="30" alt="ICON"/>
								<p class={style.item}>{item.temp}°c</p>
								<p class={style.item}>{item.precipitation * 100}%</p>
								<p class={style.item}>{item.wind}km/h</p>
								<p class={style.item}>{item.pressure}hPa</p>
								<p class={style.itemTime}>{item.hour}</p>
							</li>
						))
						: <p>Sorry :( There's no further forecast information for this day</p>
					}
				</ul>
			</div>
		);
	}

}
