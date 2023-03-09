import { h, render, Component } from 'preact';
import Popup from '../Popup/Popup';

export default class BottomBar extends Component {

	render() {
		return (
            <div>
				<button>Delays</button>
				<Popup trigger={true}>
					<h2>Delays</h2>
					<p>This is to be filled with current and upcoming delays</p>
				</Popup>
            </div>
		);
	}
}
