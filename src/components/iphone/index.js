// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import TopBar from '../topbar';
import BottomBar from '../bottombar';
import Description from '../sideTubes/description';
import Stats from '../sideTubes/stats';
import WeatherDescription from '../sideTubes/description';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		// API ID
		this.state.appid = "9addb593cb28a2e3bb3a643c14d0ef8a";

		navigator.geolocation.getCurrentPosition((position) => {
			this.fetchWeatherData(position.coords.latitude, position.coords.longitude);
			// this.addTempData(position.coords.latitude, position.coords.longitude);
		});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (lat, lon) => {

		var url;

		console.log(lat, lon);

		if(!(isNaN(lat) && isNaN(lon))) {
			this.state.lat = lat;
			this.state.lon = lon;
			url = "https://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat.toString(10).substring(0,5)+"&lon="+lon.toString(10).substring(0,5)+"&cnt=7&&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
			// POSTCODE LOCATION
			// url = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=ig6,GB&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
		} else {
			url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
		}

		console.log(url);

		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5";
		// var url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9addb593cb28a2e3bb3a643c14d0ef8a";

		this.ajaxFetch(url, this.parseResponse);

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	customFetchWeather = (pc) => {
		var url = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=ig6,GB&appid=" + this.state.appid;

		this.ajaxFetch(url, this.parseResponse);
	}

	ajaxFetch = (url, succ) => {
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : succ,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	componentDidMount() {}

	addTempData = (lat, lon) => {

		if(!(isNaN(lat) && isNaN(lon))) {
			lat = this.state.lat;
			lon = this.state.lon;
		}

		this.setState({
			locate: "Mile end",
			temp: "20",
			cond : "Nice weather",
			descAPI : "Nice weaather descAPI",
			pic : "https://openweathermap.org/img/wn/10d@4x.png"
		});
	}

	switchBackground = (code) => {

		var background_img;

		if (code >= 200 || code <= 299) { // Thunderstorm

		} else if (code >= 300 || code <= 399) { // Drizzle
			
		} else if (code >= 500 || code <= 599) { // Rain 
			
		} else if (code >= 600 || code <= 699) { // Snow 
			
		} else if (code >= 700 || code <= 799) { // Atmosphere 
			
		} else if (code == 800) { // Clear 
			
		} else { // Clouds

		}

		this.setState({
			background_img : background_img
		});

	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={style.topbar}>
					<TopBar />
				</div>
				<div class={ style.sidebarcontainer } >
					{/* <p> HELL</p> */}
					<div class={style.sidebarleft}>
						<Description locate={this.state.locate} desc={this.state.descAPI} pic={this.state.pic} />
						{/* <p>{this.state.lat}</p>
						<p>{this.state.lon}</p> */}
					</div>
					<div class={style.sidebarright}>
						<Stats />
					</div>
				</div>
				<div class={style.bottombar}>
					<BottomBar />
				</div>
				{/* <div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>  */}

				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{/* { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null } */}
					{/* { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.addTempData }/ > : null } */}
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		// THIS IS FOR DAY ONE (CURRENT DAY), WE NEED TO STORE THE 7 DAYS
		
		// var location = parsed_json['name'];
		var location = parsed_json['city']['name'];
		// var temp_c = parsed_json['main']['temp'];
		var temp_c = parsed_json['list']['0']['temp']['max'];
		// var conditions = parsed_json['weather']['0']['description'];
		var conditions = parsed_json['list']['0']['weather']['0']['description'];
		// var pic = parsed_json['weather']['0']['icon'];
		var pic = parsed_json['list']['0']['weather']['0']['icon'];
		// Getting weather id for background image
		var weather_id = parsed_json['list']['0']['weather']['0']['id'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			descAPI : conditions,
			pic : "https://openweathermap.org/img/wn/"+ pic +"@4x.png"
		});

		this.switchBackground(weather_id);
	}

	// parseReverseGeoResponse = (parsed_json) => {
	// 	var location = parsed_json['0']['name'];
	// 	console.log(location);
	// }
}
