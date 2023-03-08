// import preact
import { h, render, Component } from 'preact';

import style from './style';
import '../../assets/weather-icons/less/weather-icons'

export default class WeatherDescription extends Component {

	render() {
		return (
			<div>
				<div class={style.desc_name}>
					<h4>Mile End</h4>
				</div>
				<div class={style.desc_pic}>
					<i class="wi wi-night-sleet"></i>
				</div>
				<div class={style.desc_text}>
					<p>
						"Clear skies without a trace of rain"
					</p>
				</div>
			</div>
		);
	}
}

