import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const CurrentWeather = ({ currentWeatherData, locationData }) => {
	return (
		<div className="text-center my-auto mx-auto space-y-6">
			<div>
				<span className="ml-auto mr-auto text-6xl dark:text-gray-800 space-x-4">
					<i className={'align-middle owf owf-' + currentWeatherData.weather[0].id}></i>
					<h1 className="inline-block">{currentWeatherData.weather[0].main}</h1>
				</span>
			</div>
			<div className="divide-y text-5xl dark:divide-gray-800">
				<p>{Math.round(currentWeatherData.temp) + '°'}</p>
				<p>{Math.round(currentWeatherData.feels_like) + '°'}</p>
			</div>
			<div className="text-3xl space-y-3">
				<p>{locationData.results[0].components.city}</p>
				<p>{locationData.results[0].components.country}</p>
			</div>
		</div>
	);
};

export default CurrentWeather;
