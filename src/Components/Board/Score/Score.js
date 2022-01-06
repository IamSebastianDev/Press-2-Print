/** @format */
import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import classes from './Score.module.css';

export const Score = ({
	hasEnded,
	currentStage,
	phrases,
	score,
	scoreDifference,
}) => {
	// create the animation spring

	const [fadeOut, spring] = useSpring(() => ({
		opacity: 0,
	}));

	// dispatch the animation if the score, or the scoreDifference changes

	useEffect(() => {
		spring.start({
			opacity: 0,
			transform: 'translateY(-50px)',
			from: { opacity: 1, transform: 'translateY(0px)' },
			config: {
				tension: 90,
			},
		});
	}, [scoreDifference, score, spring]);

	return !hasEnded ? (
		<div className={classes.background}>
			<animated.span
				className={classes.fadeScore}
				style={{
					...fadeOut,
					color: scoreDifference > 0 ? 'green' : 'red',
				}}>
				{scoreDifference}
			</animated.span>
			<div className={classes.container}>
				<span className={classes.text}>Points: {score}</span>
				{currentStage !== undefined && (
					<span className={classes.text}>
						Level: {currentStage + 1} / {phrases.length}
					</span>
				)}
			</div>
		</div>
	) : (
		<div className={classes.background}>
			<div className={classes.container}>
				<span className={classes.text}>
					You won: Final score: {score}
				</span>
			</div>
		</div>
	);
};
