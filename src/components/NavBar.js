import React, { useState } from 'react';
import useDarkMode from './useDarkMode';
import useEffectUpdate from './useEffectUpdate';
import { faSearch, faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = ({ apiKey, callback }) => {
	const [colorTheme, setColorTheme] = useDarkMode();
	const [search, setSearch] = useState('');
	const [searchQuery, setSearchQuery] = useState();
	const [coords, setCoords] = useState({ latitude: null, longitude: null });

	useEffectUpdate(() => {
		const fetchAPIData = () => {
			fetch(`http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${searchQuery}`)
				.then((data) => data.json())
				.then((returnData) => {
					setCoords({ latitude: returnData.data[0].latitude, longitude: returnData.data[0].longitude });
				})
				.catch(() => {});
		};
		fetchAPIData();
	}, [searchQuery]);

	useEffectUpdate(() => {
		callback(coords);
	}, [coords]);

	const getSearch = (event) => {
		event.preventDefault();
		setSearchQuery(search);
		setSearch('');
	};

	const updateSearch = (event) => {
		//whenever input changes change the state of search
		setSearch(event.target.value);
	};

	return (
		<div className="flex justify-between">
			<div className="container flex">
				<div className="relative">
					<form onSubmit={getSearch}>
						<input
							className="container bg-gray-500w-40 sm:w-60 md:w-60 lg:w-60 h-12 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none border-2 dark:focus:bg-gray-700 bg-gray-200 focus:bg-white border-gray-300 text-gray-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
							placeholder="Search place..."
							type="text"
							value={search}
							onChange={updateSearch}
						/>
						<div className="absolute top-3 right-3">
							<button type="submit">
								<FontAwesomeIcon
									icon={faSearch}
									className="text-gray-400 z-20 hover:text-gray-500 dark:text-white"
								></FontAwesomeIcon>
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="order-last border-gray-500">
				<span onClick={() => setColorTheme(colorTheme)}>
					{colorTheme === 'light' ? (
						<FontAwesomeIcon
						icon={faMoon}
						className="text-gray-800 z-20 text-lg"
					></FontAwesomeIcon>
					) : (
						<FontAwesomeIcon
						icon={faSun}
						className="z-20 dark:text-white text-lg"
					></FontAwesomeIcon>
					)}
				</span>
			</div>
		</div>
	);
};
export default NavBar;
