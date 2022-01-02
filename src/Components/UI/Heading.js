/** @format */

import classes from './Heading.module.css';

export const Heading = ({ heading, subheading }) => {
	return (
		<div className={classes.container}>
			<h1>{heading}</h1>
			{subheading && <h3>{subheading}</h3>}
		</div>
	);
};
