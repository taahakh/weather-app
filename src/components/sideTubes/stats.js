// import preact
import { h, render, Component } from 'preact';
import style from './style';

export default class WeatherStats extends Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	temp: props.temp_c,
		// 	precipitation: props.precipitation,
		// 	uv: props.uv,
		// 	windR: props.windR
		// };
		
	}

	render() {
		return (
			<div class={style.right_side}>
				<div class = {style.desc_name}>
					<h5>Next Hour:</h5>
				</div>
				<div class={style.desc_text}>
					{/* <h1>{this.state.temp}°C</h1> */}
					<h1>{this.props.temp}°C</h1>
					<ul class={style.stats_list}>
						<li>
							<img src ='https://ibb.co/Qr4CsqF'/>
							{/* <p>{this.state.precipitation}%</p> */}
							<p>{this.props.precipitation}%</p>
						</li>
						<li>
							<img src ='https://ibb.co/KD7PH71'/>
							{/* <p>{this.state.windR}km/h</p> */}
							<p>{this.props.windR}km/h</p>
						</li>
						<li>
							<img src ='https://ibb.co/KD7PH71'/>
							{/* <p>{this.state.uv}</p> */}
							<p>{this.props.uv}</p>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}