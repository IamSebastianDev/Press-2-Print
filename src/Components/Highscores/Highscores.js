/** @format */

// import classes from './Highscores.module.css';

import { PixelContainer } from '../UI/PixelContainer';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { ScoreBadge } from './ScoreBadge';

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
						({ timestamp, score, curLevel, levelCount }, index) => (
							<li key={index}>
								<PixelContainer>
									<ScoreBadge
										date={timestamp}
										score={score}
										level={curLevel}
										maxLevel={levelCount}
									/>
								</PixelContainer>
							</li>
						)
					)}
				{highscores.length === 0 && (
					<li>
						<PixelContainer>No scores so far!</PixelContainer>
					</li>
				)}
			</List>
		</div>
	);
};
