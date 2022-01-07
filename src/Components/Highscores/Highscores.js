/** @format */

import { useState, useEffect } from 'react/cjs/react.development';

import classes from './Highscores.module.css';

import { PixelContainer } from '../UI/PixelContainer';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { CircleX } from 'react-pangolicons';

export const Highscores = () => {
	const [highscores, setHighscores] = useState(
		JSON.parse(window.localStorage.getItem('p2p-highscores')) || []
	);

	const handleDeleteHighscore = (id) => {
		const filteredScores = highscores.filter((score) => score.id !== id);
		localStorage.setItem('p2p-highscores', JSON.stringify(filteredScores));
		setHighscores(
			JSON.parse(window.localStorage.getItem('p2p-highscores')) || []
		);
	};

	return (
		<div>
			<Heading heading="Highscores" />
			<List>
				{highscores
					.sort((a, b) => (a.score >= b.score ? -1 : 1))
					.map(
						(
							{
								score,
								timeStamp,
								currentStage,
								maximumStage,
								id,
							},
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
										<button
											onClick={() => {
												handleDeleteHighscore(id);
											}}>
											<CircleX></CircleX>
										</button>
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
