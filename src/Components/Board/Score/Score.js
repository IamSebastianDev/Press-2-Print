/** @format */

import { PixelContainer } from '../../UI/PixelContainer';
import classes from './Score.module.css';

export const Score = ({ score, currentStage, stages }) => {
	return (
		<PixelContainer gridArea="score" flexDirection="column">
			<div className={classes.background}>
				<div className={classes.container}>
					<span className={classes.text}>Points: {score}</span>
					{currentStage !== undefined && (
						<span className={classes.text}>
							Level: {currentStage + 1} / {stages}
						</span>
					)}
				</div>
				<span>You get Points with every printed line!</span>
			</div>
		</PixelContainer>
	);
};
