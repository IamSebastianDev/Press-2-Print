/** @format */

import classes from './Source.module.css';

export const Source = ({ phrase, activeChar = 0 }) => {
	const chars = [...phrase];

	return (
		<div className={classes.container}>
			{chars.map((elem, index) => (
				<span
					key={index}
					className={
						index === activeChar ? classes.charActive : classes.char
					}>
					{elem}
				</span>
			))}
		</div>
	);
};
