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
			buttonPopup: false,
			days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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

		const today = new Date().getDay();
		const daysList = [];

		for (let i = 0; i < 7; i++) {
			const dayIndex = (today + i) % 7;
			const day = this.state.days[dayIndex];
			daysList.push(<div class={style.dayInner} key={i} onClick={() => this.props.days.showDayWeather(i)}>{day}</div>);
		}

		return (
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

