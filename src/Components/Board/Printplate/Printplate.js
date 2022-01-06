/** @format */

import { useDrop } from 'react-dnd';

import classes from './Printplate.module.css';

import { Die } from './Die';

export const Printplate = ({
	onAddDieToPrintplate,
	hasStarted,
	phrases,
	currentStage,
	activeChar,
	printed,
}) => {
	// define the current phrase and the remaining empty dies

	const phrase = phrases[currentStage];
	const empty = [...new Array(phrase.length - printed.length)];

	// define the drop handler

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'die',
			drop: (item) => {
				const dieValue = item.children;
				const expectedDieValue = phrase[activeChar].toLowerCase();
				onAddDieToPrintplate({ dieValue, expectedDieValue });
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[activeChar]
	);

	return (
		hasStarted && (
			<div style={{ width: '100%', height: '100%' }} ref={drop}>
				<div className={classes.container}>
					{printed.map((char, index) => (
						<Die key={index}>{char}</Die>
					))}
					{empty.map((elem, index) => (
						<Die key={index} isEmpty={true} isOver={isOver}></Die>
					))}
				</div>
			</div>
		)
	);
};
