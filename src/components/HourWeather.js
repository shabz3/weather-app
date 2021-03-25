import React from 'react';

const HourWeather = ({ time, temp, id, data }) => {
	let date = new Date(time * 1000);
	let hours = date.getHours();
	let AmOrPm = hours > 12 ? 'pm' : 'am';
	hours = hours % 12 || 12;

	return (
		<div className="grid grid-rows-3 ml-auto mr-auto text-2xl">
			<span>{Math.round(temp)}°</span>
			<span className="ml-auto mr-auto text-4xl dark:text-gray-800">
				<i className={'owf owf-' + id}></i>
			</span>
			<span>{hours + ' ' + AmOrPm}</span>
		</div>
	);
};
export default HourWeather;
