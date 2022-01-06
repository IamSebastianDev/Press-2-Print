/** @format */

import classes from './Highscores.module.css';

import { PixelContainer } from '../UI/PixelContainer';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';

export const Highscores = () => {
	let highscores =
		JSON.parse(window.localStorage.getItem('p2p-highscores')) || [];

	return (
		<div>
			<Heading heading="Highscores" />
			<List>
				{highscores
					.sort((a, b) => (a.score >= b.score ? -1 : 1))
					.map(
						(
							{ score, timeStamp, currentStage, maximumStage },
							index
						) => (
							<li key={index}>
								<PixelContainer>
									<div className={classes.container}>
										<span>
											{new Date(
												timeStamp
											).toLocaleString()}
										</span>
										<span>Points: {score}</span>
										<span>
											Stage {currentStage} /{' '}
											{maximumStage}
										</span>
									</div>
								</PixelContainer>
							</li>
						)
					)}
				{highscores.length === 0 && (
					<li>
						<PixelContainer>
							<span
								className={classes.container}
								style={{ justifyContent: 'center' }}>
								No scores so far!
							</span>
						</PixelContainer>
					</li>
				)}
			</List>
		</div>
	);
};
