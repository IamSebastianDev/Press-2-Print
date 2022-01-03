/** @format */

import classes from './Printplate.module.css';

import { Die } from './Die';

export const Printplate = ({ printed }) => {
	return (
		<div className={classes.plate}>
			<div className={classes.container}>
				{printed.map((char, index) => (
					<Die key={index}>{!char ? 'A' : char}</Die>
				))}
			</div>
		</div>
	);
};
