/** @format */

import classes from './Die.module.css';

export const Die = ({ children, empty, isOver }) => {
	return (
		<span
			style={{
				borderColor: isOver
					? 'var(--ui-clr-text-gold)'
					: 'var(--ui-clr-text-dark-shade)',
			}}
			className={!empty ? classes.die : classes.emptyDie}>
			{children}
		</span>
	);
};
