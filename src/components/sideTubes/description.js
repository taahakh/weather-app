// import preact
import { h, render, Component } from 'preact';

import style from './style';
import '../../assets/weather-icons/less/weather-icons'

export default class WeatherDescription extends Component {

	constructor(props){
		super(props);
		// this.state.desc = props.desc;
		this.setState({
			locate : props.locate,
			desc : props.descAPI,
			pic : props.pic
		})
	}


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
				</div>
			</div>
		);
	}
}

