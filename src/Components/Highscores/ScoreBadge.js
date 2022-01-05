/** @format */

import classes from './ScoreBadge.module.css';

export const ScoreBadge = ({ date, score, level, maxLevel }) => {
	let dateString = new Date(date).toDateString();

	return (
		<div className={classes.container}>
			<span className={classes.date}>{dateString}</span>
			<span className={classes.score}>Points: {score}</span>
			<span className={classes.score}>
				Level: {level} / {maxLevel}
			</span>
		</div>
	);
};
