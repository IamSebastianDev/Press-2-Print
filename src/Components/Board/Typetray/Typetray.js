/** @format */

import { Type } from './Type';
import { PixelButton } from '../../UI/PixelButton';

import classes from './Typetray.module.css';

export const Typetray = ({
	hasStarted,
	roundHasFinished,
	randomChars = [],
	onStartGame,
	onNextRound,
}) => {
	return (
		<div className={classes.tray}>
			{!hasStarted && (
				<PixelButton onClick={onStartGame}>Start game!</PixelButton>
			)}
			{hasStarted && roundHasFinished && (
				<PixelButton onClick={onNextRound}>Print line!</PixelButton>
			)}
			{hasStarted &&
				!roundHasFinished &&
				randomChars.map((char) => (
					<Type key={Math.random()}>{char.toLowerCase()}</Type>
				))}
		</div>
	);
};
