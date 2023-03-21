// import preact
import { h, render, Component, useState } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import TopBar from '../topbar';
import HourStates from '../topbar/hours';
import BottomBar from '../bottombar';
import Description from '../sideTubes/description';
import Stats from '../sideTubes/stats';
// import WeatherDescription from '../sideTubes/description';

function kelvinToCelsius(kelvin){
	return (kelvin-273.15).toFixed(1);
}

// function ajaxError(req, err){
// 	console.log('API call failed ' + err);
// }


// function ajaxError() {
// 	console.log("API call failed");
// 	this.addTempData("", "");
// 	// const app = (
// 	// 	<p>THERE was an API error call</p>
// 	// )
// 	// render(app, document.getElementById('api-weather-error'));
// }

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);

		// this.setState({ background : "../../assets/backgrounds/c.jpg" });

		this.state = {
			temp: "",
			display: true,
			degreeType: "celcius",
			appid: "9addb593cb28a2e3bb3a643c14d0ef8a",
			data : [],
			dayIndex : 0,
			pageSwitch : false
		  };

		navigator.geolocation.getCurrentPosition((position) => {
			this.fetchWeatherData(position.coords.latitude, position.coords.longitude);
			// this.addTempData(position.coords.latitude, position.coords.longitude);
		});

		// this.addTempData("","");

	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = (lat, lon) => {

		var url;

		console.log(lat, lon);

		if(!(isNaN(lat) && isNaN(lon))) {
			this.state.lat = lat;
			this.state.lon = lon;
			url = "https://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat.toString(10).substring(0,5)+"&lon="+lon.toString(10).substring(0,5)+"&cnt=7&&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
			// THIS BELOW IS A BAD URL, IT IS FOR TESTING PURPOSES
			// url = "https://api.openweathermap.org/data/2.5/forecast/daily?latSSSSSA="+lat.toString(10).substring(0,5)+"&lon="+lon.toString(10).substring(0,5)+"&cnt=7&&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
		} else {
			url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9addb593cb28a2e3bb3a643c14d0ef8a";
		}

		console.log(url);

		this.ajaxFetch(url, this.parseResponse);

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	onLocationChange = (custom_loc) => {
		this.customFetchWeather(custom_loc);
	}

	customFetchWeather = (pc) => {
		var url = "https://api.openweathermap.org/data/2.5/forecast/daily?zip="+pc+",GB&appid=" + this.state.appid;

		this.ajaxFetch(url, this.parseResponse);
	}

	ajaxFetch = (url, succ) => {
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : succ,
			error : this.ajaxError
			// error : function(req, err) {console.log('API call failed ' + err);}
		});
	}

	ajaxError = () => {
		this.addTempData("", "");
	}

	componentDidMount() {}

	addTempData = (lat, lon) => {

		if(!(isNaN(lat) && isNaN(lon))) {
			lat = this.state.lat;
			lon = this.state.lon;
		}

		this.setState({
			locate: "API CALL FAILED",
			temp: "Err",
			cond : "Error",
			descAPI : "API call for weather failed, search for location or try again later"
			// pic : "https://openweathermap.org/img/wn/10d@4x.png"
		});

		this.switchBackground(800);
	}

	showDayWeather = (index) => {
		this.state.dayIndex = index;

		this.setState({
			temp: this.state.data[index].temp,
			cond : this.state.data[index].cond,
			descAPI : this.state.data[index].descAPI,
			pic : this.state.data[index].pic,
			precipitation : this.state.data[index].precipitation,
			wind : this.state.data[index].wind,
			degreeType : this.state.data[index].degreeType
		})

		this.switchBackground(this.state.data[index].weatherID);
	}

	switchBackground = (code) => {

		let bg;

		if (code >= 200 && code <= 299) { // Thunderstorm
			bg = "../../assets/backgrounds/thunderBack.jpg";
		} else if (code >= 300 && code <= 399) { // Drizzle
			bg = "../../assets/backgrounds/drizzleBack.jpg";
		} else if (code >= 500 && code <= 599) { // Rain
			bg = "../../assets/backgrounds/rainBack.jpg";
		} else if (code >= 600 && code <= 699) { // Snow
			bg = "../../assets/backgrounds/snowBack.jpg";
		} else if (code >= 700 && code <= 799) { // Atmosphere
			bg = "../../assets/backgrounds/atmosphereBack.jpg";
		} else if (code == 800) { // Clear
			bg = "../../assets/backgrounds/c.jpg";
		} else { // Clouds
			bg = "../../assets/backgrounds/c.jpg";
		}

		this.setState({ background : bg });

	}

	handlePageSwitch = () => {
		console.log(this.state.pageSwitch);
		this.setState({
			pageSwitch : !this.state.pageSwitch
		})
		// this.state.pageSwitch = !this.state.pageSwitch;
	}

	homePage = () => {
		return (
			<div id="info-container" class={ style.sidebarcontainer }>
				<div class={style.sidebarleft}>
					<p id="api-weather-error"></p>
					<Description locate={this.state.locate} desc={this.state.descAPI} pic={this.state.pic} />
				</div>
				<div class={style.sidebarright}>
					<Stats degreeType={this.state.degreeType} temp={this.state.temp} precipitation={this.state.precipitation} uv="NONE" windR={this.state.wind} />
				</div>
		   	</div>
		);
	};

	detailedPage = () => {
		return (
			<div id="info-container" class={ style.sidebarcontainer }>
				<HourStates />
		   	</div>
		);
	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container } style={{backgroundImage: `url(${this.state.background})`}}>
				<div class={style.topbar}>
					<TopBar days={this} />
					{/* <HourStates /> */}
				</div>
					{!this.state.pageSwitch ? this.homePage() : this.detailedPage()}
				{/* <div class={ style.sidebarcontainer } > */}
					{/* {this.homePage()} */}
					{/* <div class={style.sidebarleft}>
						<Description locate={this.state.locate} desc={this.state.descAPI} pic={this.state.pic} />
					</div>
					<div class={style.sidebarright}>
						<Stats degreeType={this.state.degreeType} temp={this.state.temp} precipitation={this.state.precipitation} uv="NONE" windR={this.state.wind} />
					</div> */}
				{/* </div> */}
				<div class={style.bottombar}>
					<BottomBar changeTrigger={this}/>
				</div>

				{/* <div class={ style.details }></div> */}
				<div class= { style_iphone.container }>
					{/* { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null } */}
					{/* { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.addTempData }/ > : null } */}
					<button onClick={this.handlePageSwitch}>Transition</button>
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {

		const location = parsed_json['city']['name'];

		const list = parsed_json.list;
		const weatherData = [];

		for (let i = 0; i < list.length && i < 7; i++) {
			const temp_c = kelvinToCelsius(list[i].temp.max);
			const conditions = list[i].weather[0].description;
			const pic = list[i].weather[0].icon;
			const weather_id = list[i].weather[0].id;
			const precipitation = list[i].pop;
			const wind = list[i].speed;

			const weatherInfo = {
				temp: temp_c,
				cond: conditions,
				descAPI: conditions,
				pic: "https://openweathermap.org/img/wn/" + pic + "@4x.png",
				precipitation: precipitation,
				wind: wind,
				weatherID : weather_id,
				degreeType: "celcius"
			};

			weatherData.push(weatherInfo);
		}

		this.setState({
			locate: location,
			data: weatherData,
			degreeType: "celcius"
		});

		this.showDayWeather(this.state.dayIndex);
	}


		// parseResponse = (parsed_json) => {
	// 	// THIS IS FOR DAY ONE (CURRENT DAY), WE NEED TO STORE THE 7 DAYS

	// 	// var location = parsed_json['name'];
	// 	var location = parsed_json['city']['name'];
	// 	// var temp_c = parsed_json['main']['temp'];
	// 	var temp_c = parsed_json['list']['0']['temp']['max'];
	// 	temp_c = kelvinToCelsius(temp_c);
	// 	// var conditions = parsed_json['weather']['0']['description'];
	// 	var conditions = parsed_json['list']['0']['weather']['0']['description'];
	// 	// var pic = parsed_json['weather']['0']['icon'];
	// 	var pic = parsed_json['list']['0']['weather']['0']['icon'];
	// 	// Getting weather id for background image
	// 	var weather_id = parsed_json['list']['0']['weather']['0']['id'];
	// 	// Precipitation
	// 	var precipitation = parsed_json['list']['0']['pop'];
	// 	// Wind
	// 	var wind = parsed_json['list']['0']['speed'];

	// 	// var dataUpdate = this.state.dataUpdate === 0 ? 1 : 0;

	// 	console.log(temp_c);

	// 	// set states for fields so they could be rendered later on
	// 	this.setState({
	// 		locate: location,
	// 		temp: temp_c,
	// 		cond : conditions,
	// 		descAPI : conditions,
	// 		pic : "https://openweathermap.org/img/wn/"+ pic +"@4x.png",
	// 		precipitation : precipitation,
	// 		wind : wind,
	// 		degreeType : "celcius"
	// 	});

	// 	this.switchBackground(weather_id);
	// }
}
