/** @format */

import classes from './Score.module.css';

export const Score = ({ date, score }) => {
	let dateString = new Date(date).toDateString();

	return (
		<div className={classes.container}>
			<span className={classes.date}>{dateString}</span>
			<span className={classes.score}>Points: {score}</span>
		</div>
	);
};
