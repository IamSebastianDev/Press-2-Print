/** @format */

import classes from './Typetray.module.css';
import { Type } from './Type';
import { PixelButton } from '../../UI/PixelButton';
import { PixelContainer } from '../../UI/PixelContainer';

export const Typetray = ({
	randomChars = [],
	hasStarted,
	roundFinished,
	startGame,
	nextRound,
	addDieToPrint,
}) => {
	return (
		<PixelContainer gridArea="typetray" flexDirection="row">
			<div className={classes.tray}>
				{!hasStarted && (
					<PixelButton handleOnClick={startGame}>
						Start game!
					</PixelButton>
				)}
				{hasStarted && roundFinished && (
					<PixelButton handleOnClick={nextRound}>
						Print line!
					</PixelButton>
				)}
				{hasStarted &&
					!roundFinished &&
					randomChars.map((char, index) => (
						<Type addDieToPrint={addDieToPrint} key={Math.random()}>
							{char.toLowerCase()}
						</Type>
					))}
			</div>
		</PixelContainer>
	);
};
