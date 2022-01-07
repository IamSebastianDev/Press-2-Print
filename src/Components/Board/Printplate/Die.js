/** @format */

import { joinClassNames as cls } from '../../../Scripts/JoinClasses.utility';
import classes from './Die.module.css';

export const Die = ({ children, isEmpty = false, isOver }) => {
	return (
		<span
			style={{
				borderColor: isOver
					? 'var(--ui-clr-text-gold)'
					: 'var(--ui-clr-text-dark)',
			}}
			className={cls(
				classes.die,
				!isEmpty ? classes.filled : classes.empty
			)}>
			{children}
		</span>
	);
};
