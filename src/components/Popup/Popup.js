import { h, Component } from 'preact';

export default class Popup extends Component {
	render(contents) {
		const styles = {
			popup: {
				position : 'fixed',
				top : '0',
				left : '0',
				width : '100%',
				height : '100vh',
				backgroundColor : 'rgba(0, 0, 0, 0.6)',
				color : '#000000',
				display : 'flex',
				justifyContent : 'center',
				alignItems : 'center'
			},
			popupInner: {
				position : 'relative',
				padding : '32px',
				width : '100%',
				maxWidth : '640px',
				backgroundColor: '#FFFFFF'
			},
			closeBtn: {
				position : 'absolute',
				top : '16px',
				right : '16px'
			}
		};

		return (contents.trigger) ? (
			<div className="popup" style={styles.popup}>
				<div className="popup-inner" style={styles.popupInner}>
					<button className="close-btn" style={styles.closeBtn} onClick={contents.onClose}>Close</button>
					{ contents.children }
				</div>
			</div>
		) : "";
	}
}
