/** @format */

import { useDrop } from 'react-dnd';

import classes from './Printplate.module.css';

import { Die } from './Die';
import { PixelContainer } from '../../UI/PixelContainer';

export const Printplate = ({
	printed,
	phrase,
	hasStarted,
	addDieToPrintPlate,
	activeChar,
}) => {
	const empty = [...new Array(phrase.length - printed.length)];

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'die',
			drop: (item) => {
				addDieToPrintPlate(
					item.children,
					phrase[activeChar].toLowerCase()
				);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[activeChar]
	);

	return (
		<PixelContainer gridArea="printplate" flexDirection="row">
			{hasStarted && (
				<div style={{ width: '100%', height: '100%' }} ref={drop}>
					<div className={classes.container}>
						{printed.map((char, index) => (
							<Die key={index}>{char}</Die>
						))}
						{empty.map((elem, index) => (
							<Die key={index} empty={true} isOver={isOver}></Die>
						))}
					</div>
				</div>
			)}
		</PixelContainer>
	);
};
