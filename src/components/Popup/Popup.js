import { h, Component } from 'preact';
import Style from './style.less';

export default class Popup extends Component {
	//main render of popup component
	render(contents) {

		return (contents.trigger) ? (
			<div class={Style.popup}>
				<div class={Style.popupInner}>
					<button class={Style.closeBtn} onClick={contents.onClose}>Close</button>
					{ contents.children }
				</div>
			</div>
		) : "";
	}
}
