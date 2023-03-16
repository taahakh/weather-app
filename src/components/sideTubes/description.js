// import preact
import { h, render, Component } from 'preact';

import style from './style';
import '../../assets/weather-icons/less/weather-icons'

export default class WeatherDescription extends Component {

	constructor(props){
		super(props);
		// this.state.desc = props.desc;
		this.setState({
			// location: props.locate,
			// name: props.desc,
			locate : props.locate,
			desc : props.descAPI
		});
	}


	render() {
		return (
			<div>
				<div class={style.desc_name}>
					<h4>{ this.props.locate }</h4>
				</div>
				<div class={style.desc_pic}>
					<i class="wi wi-night-sleet"></i>
				</div>
				<div class={style.desc_text}>
					<p>
						<p>"{ this.props.desc }"</p>
					</p>
				</div>
			</div>
		);
	}
}

