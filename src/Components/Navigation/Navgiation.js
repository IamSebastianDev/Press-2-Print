/** @format */

import classes from './Navigation.module.css';

import { ChevronLeft } from 'react-pangolicons';

export const Navigation = ({ mode, handleReturnToMenu }) => {
	return (
		<nav className={classes.nav}>
			<button
				className={classes.nav__action_button}
				onClick={handleReturnToMenu}>
				<ChevronLeft strokeWidth={3}></ChevronLeft>
			</button>
		</nav>
	);
};
