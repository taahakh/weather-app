import { h, render, Component, useState } from 'preact';
import Popup from '../Popup/Popup';
import Style from './style.less';

export default class BottomBar extends Component {
	//setting up values passed into file into variables
	constructor(props) {
		super(props);
		this.state = {
			delaysPopup: false,
			locationPopup: false,
			lineStatuses: {}
		};
	}

	//setting up the tfl API
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

	//setting up the location search
	handleChangeTrigger = (custom_loc) => {
		this.props.changeTrigger.onLocationChange(custom_loc);
	}

	//main render of bottom part of weather page
	render() {
		//Delays
		const { delaysPopup, locationPopup, lineStatuses } = this.state;
		const lineNames = ['Bakerloo', 'Central', 'Circle', 'District', 'Elizabeth', 'Hammersmith-city',
			'Jubilee', 'Metropolitan', 'Northern', 'Piccadilly', 'Victoria', 'Waterloo-city', 'London-overground', 'DLR', 'Tram'];
		return (
			<div className="bottom-bar">
				<button onClick={() => this.setState({ delaysPopup: true })} class={Style.delaysButton}>
					Delays
				</button>
				<Popup position="top:0" trigger={delaysPopup} onClose={() => this.setState({ delaysPopup: false })}>
					<h4 style="margin-top: 0px; margin-bottom: 20px;"><u>Delays</u></h4>
					{lineNames.sort((a, b) => {
						if (lineStatuses[a] === 'Severe Delays') return -1;
						if (lineStatuses[b] === 'Severe Delays') return 1;
						if (lineStatuses[a] === 'Part Suspended') return -1;
						if (lineStatuses[b] === 'Part Suspended') return 1;
						if (lineStatuses[a] === 'Minor Delays') return -1;
						if (lineStatuses[b] === 'Minor Delays') return 1;
						return 0;}).map((lineName) => (<p style={{color: lineStatuses[lineName] === 'Severe Delays' ? 'red':
								lineStatuses[lineName] === 'Part Suspended' ? 'red': lineStatuses[lineName] === 'Minor Delays' ? '#e66e19': 'green', fontSize: '18px', margin: '12px'}}>
								{lineName}: {lineStatuses[lineName] || 'Loading...'}</p>))}
				</Popup>

				{/*search location*/}
				<button onClick={() => this.setState({ locationPopup: true })} class={Style.delaysButton}>
					Search Location
				</button>
				<Popup trigger={locationPopup} onClose={() => this.setState({ locationPopup: false })}>
					<h4 style="margin-top: 0px;"><u>Location</u></h4>
					{/* <p>Insert Location Stuff Here...</p> */}
					<input type="text" id="custom_loc" name="custom_loc" class={Style.locationSearch}></input>
					<button type="button" class={Style.locationSubmit} onClick={() => {
						var custom_loc = document.getElementById("custom_loc").value;
						console.log(custom_loc);
						this.handleChangeTrigger(custom_loc);
						this.setState({ locationPopup: false });
					}}>Submit</button>
				</Popup>
			</div>
		);
	}
}
