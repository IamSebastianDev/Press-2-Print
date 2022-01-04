/** @format */

import classes from './Die.module.css';

export const Die = ({ children, empty }) => (
	<span className={!empty ? classes.die : classes.emptyDie}>{children}</span>
);
