import { h, render, Component, useState } from 'preact';
import Popup from '../Popup/Popup';
import Style from './style.less';

export default class BottomBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			delaysPopup: false,
			locationPopup: false,
			lineStatuses: {}
		};
	}

	componentDidMount() {
		const lineNames = ['Bakerloo', 'Central', 'Circle', 'District', 'Elizabeth', 'Hammersmith-city', 'Jubilee', 'Metropolitan', 'Northern', 'Piccadilly', 'Victoria', 'Waterloo-city', 'London-overground', 'DLR', 'Tram'];
		lineNames.forEach(lineName => {
			fetch(`https://api.tfl.gov.uk/Line/${lineName}/Status?detail=true&app_key=8d08c9f40f7a4ff9a2e354b276dd1956`)
				.then(response => response.json())
				.then(data => {
					const lineStatus = data[0].lineStatuses[0].statusSeverityDescription;
					this.setState(prevState => ({
						lineStatuses: {
							...prevState.lineStatuses,
							[lineName]: lineStatus
						}
					}));
				})
				.catch(error => console.error(error));
		});
	}

	render() {
		const { delaysPopup, locationPopup, lineStatuses } = this.state;
		const lineNames = ['Bakerloo', 'Central', 'Circle', 'District', 'Elizabeth', 'Hammersmith-city',
			'Jubilee', 'Metropolitan', 'Northern', 'Piccadilly', 'Victoria', 'Waterloo-city', 'London-overground', 'DLR', 'Tram'];
		return (
			<div className="bottom-bar">
				<button onClick={() => this.setState({ delaysPopup: true })} class={Style.delaysButton}>
					Delays
				</button>
				<Popup trigger={delaysPopup} onClose={() => this.setState({ delaysPopup: false })}>
					<h3>Delays</h3>
					{lineNames.sort((a, b) => {
							if (lineStatuses[a] === 'Severe Delays') return -1;
							if (lineStatuses[b] === 'Severe Delays') return 1;
							if (lineStatuses[a] === 'Part suspended') return -1;
							if (lineStatuses[b] === 'Part suspended') return 1;
							if (lineStatuses[a] === 'Minor Delays') return -1;
							if (lineStatuses[b] === 'Minor Delays') return 1;
							return 0;}).map((lineName) => (<p style={{color: lineStatuses[lineName] === 'Severe Delays' ? 'red':
								lineStatuses[lineName] === 'Part suspended' ? 'red': lineStatuses[lineName] === 'Minor Delays' ? '#e66e19': 'green', fontSize: '20px'}}>
								{lineName}: {lineStatuses[lineName] || 'Loading...'}</p>))}
				</Popup>
				<button onClick={() => this.setState({ locationPopup: true })} class={Style.delaysButton}>
					Search Location
				</button>
				<Popup trigger={locationPopup} onClose={() => this.setState({ locationPopup: false })}>
					<h3>Location</h3>
					<p>Insert Location Stuff Here...</p>
				</Popup>
			</div>
		);
	}
}
