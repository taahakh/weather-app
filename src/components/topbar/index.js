
import { h, render, Component } from 'preact';
import Popup from '../Popup/Popup';
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import style from './style';

import "react-datepicker/dist/react-datepicker.css"

export default class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buttonPopup: false
		};
	}

    render() {
    const DatePicker = () => {
    const [date, setDate] = useState('')
    const dateInputRef = useRef(null);
    const handleChange = (e) => {
    setDate
    };


};
  //  const [startDate, setStartDate] = useState(new Date());
       return (
       			<div className="bottom-bar">
				<table border="1">
				<tr>
					<td colspan="7" align = "center" >
						<div>
       						<input type="date"/>
       					</div>
       				</td>
       			</tr>
       			<tr>
       			<td class={ style.day }>Mon</td>
       			<td class={ style.day }>Tue</td>
       			<td class={ style.day }>Wed</td>
       			<td class={ style.day }>Thur</td>
       			<td class={ style.day }>Fri</td>
       			<td class={ style.day }>Sat</td>
       			<td class={ style.day }>Sun</td>
       			</tr>
				</table>
       			<div>

       			</div>
       				<button onClick={() => this.setState({ buttonPopup: true })}>
       					Location
       				</button>
       				<Popup trigger={this.state.buttonPopup} onClose={() => this.setState({ buttonPopup: false })}>
       					<h3>Location</h3>
       					<p>Insert Location Here...</p>
       				</Popup>

       			</div>

       		);



    }
}
