import { h, render, Component } from 'preact';
import Popup from '../Popup/Popup';
// import React, {useState} from 'react';
// import DatePicker from 'react-datepicker';
import style from './style.less';


// import "react-datepicker/dist/react-datepicker.css"

export default class TopBar extends Component {

	//setting up the top bar with the days to select from
	constructor(props) {
		super(props);
		this.state = {
			buttonPopup: false,
			days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		};
	}

	//main render for top bar
	render() {

		const today = new Date().getDay();
		const daysList = [];

		for (let i = 0; i < 7; i++) {
			const dayIndex = (today + i) % 7;
			const day = this.state.days[dayIndex];
			daysList.push(<div class={style.dayInner} key={i} onClick={() => this.props.days.showDayHandler(i)}>{day}</div>);
		}

		return (
			// eslint-disable-next-line no-mixed-spaces-and-tabs
       			<div className="bottom-bar">
					{/* <div align="center">
						<input type="date" class={style.calendar}/>
					</div> */}
					<div class={style.dayOuter}>
						{daysList}
					</div>
				   </div>


		);



	}
}

