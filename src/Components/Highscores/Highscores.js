/** @format */

// import classes from './Highscores.module.css';

import { PixelButton } from '../UI/PixelButton';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Score } from './Score';

export const Highscores = () => {
	let mockdata = [
		{
			date: new Date(1233141231314),
			score: 1440,
		},
		{
			date: new Date(2312341231312),
			score: 140,
		},
		{
			date: new Date(1312341265419),
			score: 14120,
		},
	];

	window.localStorage.setItem('p2p-highscores', JSON.stringify(mockdata));

	let highscores =
		JSON.parse(window.localStorage.getItem('p2p-highscores')) || [];

	return (
		<div>
			<Heading heading="Highscores" />
			<List>
				{highscores
					.sort((a, b) => (a.score > b.score ? -1 : 1))
					.map(({ date, score }, index) => (
						<li key={index}>
							<PixelButton>
								<Score date={date} score={score} />
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
