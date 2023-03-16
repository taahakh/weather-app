import { render } from 'preact';

function Stats(props) {
    let [precipitation,setPrecipitation] = useState('');
    let [windR, setWindR] = useState();
    let [uv, setUV] = useState('');

    return (
        <div id = "right-side">
            <h1>Next Hour:</h1>
            <p>{temp}</p>
            <Stat icon = {props.rainIcon} stat = {'${precipitation}%'}/>
            <Stat icon = {props.windIcon} stat = {'${windR}km/h'}/>
            <Stat icon = {props.uvIcon} stat = {'${uv}'}/>
        </div>
    );
}