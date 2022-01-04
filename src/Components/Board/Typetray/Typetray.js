/** @format */

import classes from './Typetray.module.css';
import { Type } from './Type';
import { PixelButton } from '../../UI/PixelButton';

export const Typetray = ({
	randomChars = [],
	hasStarted,
	roundFinished,
	startGame,
	nextRound,
	addDieToPrint,
}) => {
	const button = [
		<PixelButton handleOnClick={startGame}>Start game!</PixelButton>,
		<PixelButton handleOnClick={nextRound}>Print line!</PixelButton>,
	];

	return (
		<div className={classes.tray}>
			{!hasStarted && button[0]}
			{hasStarted && roundFinished && button[1]}
			{hasStarted &&
				!roundFinished &&
				randomChars.map((char, index) => (
					<Type addDieToPrint={addDieToPrint} key={index}>
						{char.toLowerCase()}
					</Type>
				))}
		</div>
	);
};
