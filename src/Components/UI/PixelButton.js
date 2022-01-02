/** @format */

import classes from './PixelButton.module.css';

import { Circle } from 'react-pangolicons';

export const PixelButton = ({ handleOnClick = null, children }) => {
	const attributes = {
		strokeWidth: 5,
		classNames: 'button__svg',
		size: 18,
	};

	return (
		<button
			className={
				classes.button__pixel +
				' ' +
				(handleOnClick !== null ? classes.button__button : '')
			}
			onClick={handleOnClick}>
			<Circle {...attributes} />
			<span className={classes.button__text}>{children}</span>
			<Circle {...attributes} />
		</button>
	);
};
