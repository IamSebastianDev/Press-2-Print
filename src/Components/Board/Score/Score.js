/** @format */
import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import { PixelContainer } from '../../UI/PixelContainer';
import classes from './Score.module.css';

export const Score = ({ score, scoreDif, currentStage, stages }) => {
	const [fadeOut, spring] = useSpring(() => ({
		opacity: 0,
	}));

	useEffect(() => {
		spring.start({
			opacity: 0,
			transform: 'translateY(-50px)',
			from: { opacity: 1, transform: 'translateY(0px)' },
			config: {
				tension: 90,
			},
		});
	}, [scoreDif, score]);

	return (
		<PixelContainer gridArea="score" flexDirection="column">
			<div className={classes.background}>
				<animated.span
					className={classes.fadeScore}
					style={{
						...fadeOut,
						color: scoreDif > 0 ? 'green' : 'red',
					}}>
					{scoreDif}
				</animated.span>
				<div className={classes.container}>
					<span className={classes.text}>Points: {score}</span>
					{currentStage !== undefined && (
						<span className={classes.text}>
							Level: {currentStage + 1} / {stages}
						</span>
					)}
				</div>
			</div>
		</PixelContainer>
	);
};
