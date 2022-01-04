/** @format */

import classes from './PixelContainer.module.css';

export const PixelContainer = ({ id, gridArea, flexDirection, children }) => {
	return (
		<div
			style={{ gridArea, flexDirection }}
			id={id}
			className={classes.container}>
			{children}
		</div>
	);
};
