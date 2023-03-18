
import { h, render, Component } from 'preact';
import Popup from '../Popup/Popup';
// import React, {useState} from 'react';
// import DatePicker from 'react-datepicker';
import style from './style.less';

// import "react-datepicker/dist/react-datepicker.css"

export default class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buttonPopup: false
		};
	}

	render() {
		// const DatePicker = () => {
		// 	const [date, setDate] = useState('')
		// 	const dateInputRef = useRef(null);
		// 	const handleChange = (e) => {
		// 	setDate
		// 	};


		// };
  //  const [startDate, setStartDate] = useState(new Date());
		return (
			// eslint-disable-next-line no-mixed-spaces-and-tabs
       			<div className="bottom-bar">
					{/* <div align="center">
						<input type="date" class={style.calendar}/>
					</div> */}
					<div class={style.dayOuter}>
						<div class={style.dayInner}>Mon</div>
						<div class={style.dayInner}>Tue</div>
						<div class={style.dayInner}>Wed</div>
						<div class={style.dayInner}>Thu</div>
						<div class={style.dayInner}>Fri</div>
						<div class={style.dayInner}>Sat</div>
						<div class={style.dayInner}>Sun</div>
					</div>
				   </div>


		);



	}
}
