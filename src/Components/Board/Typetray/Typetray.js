/** @format */

import classes from './Typetray.module.css';
import { Type } from './Type';
import { PixelButton } from '../../UI/PixelButton';

export const Typetray = ({ chars = [], handlePrint }) => {
	return (
		<div className={classes.tray}>
			{chars.map((char, index) => (
				<Type key={index}>{char}</Type>
			))}
			{chars.length === 0 && (
				<PixelButton handleOnClick={handlePrint}>Print!</PixelButton>
			)}
		</div>
	);
};
