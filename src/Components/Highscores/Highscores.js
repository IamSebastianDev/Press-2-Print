/** @format */

// import classes from './Highscores.module.css';

import { PixelButton } from '../UI/PixelButton';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Score } from './Score';

export const Highscores = () => {
	let highscores =
		JSON.parse(window.localStorage.getItem('p2p-highscores')) || [];

	return (
		<div>
			<Heading heading="Highscores" />
			<List>
				{highscores
					.sort((a, b) => (a.score >= b.score ? -1 : 1))
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
