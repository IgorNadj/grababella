import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

export class MainScreen extends React.Component {

	shouldBringBrolly() {
		if (this.props.weather.probabilityOfPrecip < 0.3 && this.props.weather.precipMax < 2.5) {
			return false; // if it does rain, it won't rain much
		}
		if (this.props.weather.precipMax < 1) {
			return false; // even if 100% chance, this is not a lot of rain, wear a hood
		}
		return true;
	}

	render() {
		const isLoading = this.props.weather.lastUpdated === null;
		let primaryText = null;
		if (isLoading) {
			primaryText = 'Loading...';
		} else {
            primaryText = this.shouldBringBrolly() ? 'Bring brolly!' : '☀️ all good️'
		}
		let today;
		let lastUpdated;
		if (!isLoading) {
            today = moment(this.props.weather.day);
            lastUpdated = moment(this.props.weather.lastUpdated);
		}
		return (
			<View style={styles.layout}>
				<View style={styles.primaryContainer}>
					<View style={styles.primary}>
						<Text style={styles.primaryText}>
							{primaryText}
						</Text>
					</View>
				</View>
				<View style={styles.secondaryContainer}>
					<Text style={styles.secondaryText}>{today ? today.format('dddd, MMM Do') : ''}</Text>
                    <Text style={styles.secondaryText}>Max: {this.props.weather.maxTemp}</Text>
                    <Text style={styles.secondaryText}>Rain: {this.props.weather.precipMax}mm</Text>
                    <Text style={styles.secondaryText}>Chance of rain: {(this.props.weather.probabilityOfPrecip)*100}%</Text>
					<Text style={styles.secondaryText}>Last updated {lastUpdated ? lastUpdated.fromNow() : ''}</Text>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		flexDirection: 'column',
		padding: 20,
		backgroundColor: '#a3a',
	},
	primaryContainer: {
		flex: 3,
		alignItems: 'center',
        justifyContent: 'space-around',
	},
	secondaryContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	secondaryText: {
		color: 'white',
	},
	primary: {
	},
	primaryText: {
		fontSize: 30,
		color: 'white',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
