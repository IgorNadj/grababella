import React from 'react';
import { MainScreen } from '../screens/MainScreen';


export class MainContainer extends React.Component {
	
	constructor(props) {
    	super(props);
    	this.state = {
    		weather: {
    			lastUpdated: null,
    			day: null,
    			maxTemp: null,
    			precipMin: null,
    			precipMax: null,
    			probabilityOfPrecip: null,
    		}
    	};
    }

    componentWillMount() {
    	this.getData();
    }

    getData() {
		fetch('https://s3.us-east-2.amazonaws.com/grababella/grababella.json?123')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ weather: responseJson });
			})
			.catch((error) => {
				console.error(error);
			});
    }

    render() {
    	return (
    		<MainScreen weather={this.state.weather} />
    	);
    }

}