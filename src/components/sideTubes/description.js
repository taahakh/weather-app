// import preact
import { h, render, Component } from 'preact';

import style from './style.less';
import '../../assets/weather-icons/less/weather-icons';

export default class WeatherDescription extends Component {

	//setting up values passed into js file to local variables
	constructor(props){
		super(props);
		// this.state.desc = props.desc;
		this.setState({
			locate : props.locate,
			desc : props.descAPI,
			pic : props.pic,
			pageSwitch : props.pageSwitch
		});
	}

	//main render for weather description of page
	render() {
		return (
			<div>
				<div class={style.desc_name}>
					<h4>{ this.props.locate }</h4>
				</div>
				<div class={style.desc_pic}>
					{/* <i class="wi wi-night-sleet"></i> */}
					<img src={this.props.pic}></img>
				</div>
				<div class={style.desc_text}>
					<p>
						<p>"{ this.props.desc }"</p>
					</p>
					<button class={style.desc_button} onClick={this.props.switch}>Hourly Weather</button>
				</div>
			</div>
		);
	}
}

