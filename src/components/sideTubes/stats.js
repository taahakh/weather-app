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
		this.state = {
			temp_state: "celcius",
			symbol: "°C"
		};
	}

	handleTemperatureChange = () => {
		if (this.props.degreeType === "celcius") {
			this.props.degreeType = "fahrenheit";
			this.props.temp = celsiusToFahrenheit(this.props.temp);
			this.setState({symbol: "°F"});
		} else {
			this.props.degreeType = "celcius";
			this.props.temp = fahrenheitToCelsius(this.props.temp);
			this.setState({symbol: "°C"});
		}
	}

	componentDiDUpdate(prevProps, prevState) {
		if (prevProps.degreeType !== this.props.degreeType) {
			if (prevProps.degreeType === "farhenheit") {
				this.props.temp = celsiusToFahrenheit(this.props.temp);
				this.setState({symbol: "°F"});
			}
		}
	}


	render() {
		return (
			<div class={style.right_side}>
				<div class = {style.statName}>Next Hour:</div>
				<div class={style.desc_text}>
					<h2 onClick={this.handleTemperatureChange}>{this.props.temp}{this.state.symbol}</h2>
					<ul class={style.stats_list}>
						<li>
							<img src ='https://img.freepik.com/free-icon/water-drop_318-423722.jpg?w=2000' class={style.infoImage}/>
							{/* <p>{this.state.precipitation}%</p> */}
							<p>{this.props.precipitation}%</p>
						</li>
						<li>
							<img src ='https://cdn-icons-png.flaticon.com/512/439/439471.png' class={style.infoImage}/>
							{/* <p>{this.state.windR}km/h</p> */}
							<p>{this.props.windR}km/h</p>
						</li>
						<li>
							<img src ='https://cdn-icons-png.flaticon.com/512/2945/2945800.png' class={style.infoImage}/>
							{/* <p>{this.state.uv}</p> */}
							<p>{this.props.uv}</p>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

function celsiusToFahrenheit(celsius) {
	const fahrenheit = (celsius * 9/5) + 32;
	return fahrenheit.toFixed(1);
}

function fahrenheitToCelsius(fahrenheit) {
	const celsius = (fahrenheit - 32) * 5/9;
	return celsius.toFixed(1);
}

