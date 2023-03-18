import React from 'react';
import { render } from 'preact';


export function Stat(props) {
	return (
        <div>
            <img src = {props.icon}/>
            <p>{props.stat}</p>
        </div>
	);
}
