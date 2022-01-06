/** @format */

import classes from './Source.module.css';

export const Source = ({
	hasStarted,
	phrases,
	currentStage,
	activeChar = 0,
}) => {
	// spread all characters of the current phrase
	const chars = [...phrases[currentStage]];

	return (
		<div className={classes.background}>
			{hasStarted &&
				chars.map((elem, index) => (
					<span
						key={index}
						className={
							index === activeChar
								? classes.charActive
								: classes.char
						}>
						{elem.toLowerCase()}
					</span>
				))}
		</div>
	);
};
