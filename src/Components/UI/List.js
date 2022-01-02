/** @format */

import classes from './List.module.css';

export const List = ({ children }) => {
	return <ul className={classes.list}>{children}</ul>;
};
