import React, { useState, useEffect } from 'react';
import useDarkMode from './useDarkMode';
import useEffectUpdate from './useEffectUpdate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
							className="container bg-gray-500w-40 sm:w-60 md:w-60 lg:w-60 h-12 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none border-2 dark:focus:bg-gray-500 bg-gray-200 focus:bg-white border-gray-300 text-gray-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							width="24px"
							height="24px"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							width="24px"
							height="24px"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					)}
				</span>
			</div>
		</div>
	);
};
export default NavBar;
