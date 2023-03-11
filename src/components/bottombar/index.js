import { h, render, Component, useState } from 'preact';
import Popup from '../Popup/Popup';

export default class BottomBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonPopup: false
		};
	}

	render() {
		return (
			<div className="bottom-bar">
				<button onClick={() => this.setState({ buttonPopup: true })}>
					Delays
				</button>
				<Popup trigger={this.state.buttonPopup} onClose={() => this.setState({ buttonPopup: false })}>
					<h3>Delays</h3>
					<p>Insert Delays Here...</p>
				</Popup>
			</div>
		);
	}
}
