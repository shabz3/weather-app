import React, { useEffect, useState } from 'react';
import useEffectUpdate from './components/useEffectUpdate';
import logo from './logo.svg';
import './App.css';
import HourWeather from './components/HourWeather';
import NavBar from './components/NavBar';
import CurrentWeather from './components/CurrentWeather';

function App() {
	const apiKey_openweathermap = 'd00843cf9d7174970dbb9b72de9c2adf';
	const apiKey_opencagedata = '3e851baaedc9454aa9e4560f77638ede';
	const apiKey_positionstack = 'c2a94b3ec70a50f4e0af536cd426d100';

	const [coords, setCoords] = useState({ latitude: null, longitude: null });
	const [weatherData, setWeatherData] = useState([]);
	const [currentWeatherData, setCurrentWeatherData] = useState();
	const [locationData, setLocationData] = useState();
	const [timezoneOffset, setTimezoneOffset] = useState();
	const [hourTempData, setHourTempData] = useState([]);

	const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey_openweathermap}`;

	useEffect(() => {
		getLocation();
	}, []);

	useEffectUpdate(() => {
		fetchAddress();
		fetchWeatherAPI(weatherUrl);
	}, [coords]);

	const fetchAddress = () => {
		fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${apiKey_opencagedata}`
		)
			.then((data) => data.json())
			.then((returnData) => {
				setLocationData(returnData);
			});
	};

	const fetchWeatherAPI = (url) => {
		fetch(url)
			.then((data) => data.json())
			.then((returnData) => {
				setCurrentWeatherData(returnData.current);
				setTimezoneOffset(returnData.timezone_offset);
				const currentTimeUTC = returnData && returnData.current.dt;
				for (let hourData in returnData.hourly) {
					if (weatherData.length === 4) {
						break;
					} else if (
						returnData.hourly[hourData].dt > currentTimeUTC &&
						returnData.hourly[hourData].dt - currentTimeUTC < 14400
					) {
						setWeatherData((prevValue) => [...prevValue, returnData.hourly[hourData]]);
						setHourTempData((prevValue) => [...prevValue, returnData.hourly[hourData].temp]);
					}
				}
			});
	};

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
			},
			function () {
				setCoords({ latitude: 40.7484, longitude: -73.985428 });
			}
		);
	};

	const handleCallback = (coords) => {
		setWeatherData([]);
		setCoords(coords);
	};

	return (
		<div className="p-1 h-screen flex flex-col bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400  text-white">
			<div className="flex-none">
				{locationData ? <NavBar apiKey={apiKey_positionstack} callback={handleCallback} /> : null}
			</div>
			<div className="flex flex-grow dark:text-gray-800">
				{currentWeatherData && locationData ? (
					<CurrentWeather currentWeatherData={currentWeatherData} locationData={locationData} />
				) : null}
			</div>

			<div className="grid grid-cols-4 text-center flex-none dark:text-gray-800">
				{weatherData
					? weatherData.map((hourData) => (
							<HourWeather
								time={hourData.dt + timezoneOffset}
								temp={hourData.temp}
								id={hourData.weather[0].id}
							/>
					  ))
					: null}
			</div>
		</div>
	);
}

export default App;
