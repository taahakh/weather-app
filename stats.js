// import preact
import { h, render, Component } from 'preact';
import style from './style';

export default class WeatherStats extends Component {
	constructor(props){
		super(props);
		this.state = {
			temp:'1',
			precipitation:'1',
			uv:'1',
			windR:'1'
		};
		
	}

	render() {
		return (
			<div class={style.right_side}>
				<div class = {style.desc_name}>
					<h5>Next Hour:</h5>
				</div>
				<div class={style.desc_text}>
					<h1>{this.state.temp}°C</h1>
					<ul class={style.stats_list}>
						<li>
							<img src ='https://ibb.co/Qr4CsqF'/>
							<p>{this.state.precipitation}%</p>
						</li>
						<li>
							<img src ='https://ibb.co/KD7PH71'/>
							<p>{this.state.windR}km/h</p>
						</li>
						<li>
							<img src ='https://ibb.co/KD7PH71'/>
							<p>{this.state.uv}</p>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}