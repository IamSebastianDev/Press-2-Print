/** @format */

import classes from './Highscores.module.css';

import { PixelButton } from '../UI/PixelButton';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';

export const Highscores = () => {
	let mockdata = [
		{
			date: Date.now(2000123),
			points: 1440,
		},
		{
			date: Date.now(12341233),
			points: 140,
		},
		{
			date: Date.now(1233142),
			points: 14120,
		},
	];

	window.localStorage.setItem('p2p-highscores', JSON.stringify(mockdata));

	let highscores =
		JSON.parse(window.localStorage.getItem('p2p-highscores')) || [];

	return (
		<div>
			<Heading heading="Highscores" />
			<List>
				{highscores.map(({ date, points }, index) => (
					<li key={index}>
						<PixelButton>
							{new Date(date).toLocaleString()} {points}
						</PixelButton>
					</li>
				))}
				{highscores.length === 0 && (
					<li>
						<PixelButton>No scores so far!</PixelButton>
					</li>
				)}
			</List>
		</div>
	);
};
