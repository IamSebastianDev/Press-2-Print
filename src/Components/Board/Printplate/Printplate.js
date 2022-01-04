/** @format */

import classes from './Printplate.module.css';

import { Die } from './Die';
import { PixelContainer } from '../../UI/PixelContainer';

export const Printplate = ({ printed, phrase, hasStarted }) => {
	const empty = [...new Array(phrase.length - printed.length)];

	return (
		<PixelContainer gridArea="printplate" flexDirection="row">
			{hasStarted && (
				<div className={classes.container}>
					{printed.map((char, index) => (
						<Die key={index}>{char}</Die>
					))}
					{empty.map((elem, index) => (
						<Die key={index} empty={true}></Die>
					))}
				</div>
			)}
		</PixelContainer>
	);
};
