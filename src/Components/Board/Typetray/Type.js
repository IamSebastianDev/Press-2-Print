/** @format */

import classes from './Type.module.css';

export const Type = ({ children, addDieToPrint }) => {
	// return <span className={classes.type}>{children}</span>;
	return (
		<button
			onClick={() => addDieToPrint(children)}
			className={classes.type}>
			{children}
		</button>
	);
};
