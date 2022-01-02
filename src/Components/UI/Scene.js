/** @format */

import classes from './Scene.module.css';

export const Scene = ({ id, children }) => (
	<section id={id} className={classes.scene}>
		{children}
	</section>
);
