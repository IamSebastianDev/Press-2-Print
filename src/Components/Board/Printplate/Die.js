/** @format */

import classes from './Die.module.css';

export const Die = ({ children, isEmpty = false, isOver }) => {
	return (
		<span
			style={{
				borderColor: isOver
					? 'var(--ui-clr-text-gold)'
					: 'var(--ui-clr-text-dark)',
			}}
			className={[
				classes.die,
				!isEmpty ? classes.filled : classes.empty,
			].join(' ')}>
			{children}
		</span>
	);
};
