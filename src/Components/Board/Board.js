/** @format */

import React, { useState } from 'react';

import classes from './Board.module.css';
import phrases from '../../assets/texts/volgate.js';

import { Typetray } from './Typetray/Typetray';
import { Printplate } from './Printplate/Printplate';
import { Source } from './Source/Source';

export const Board = () => {
	let [stage, setStage] = useState(10);
	let [activeChar, setActiveChar] = useState(0);

	let printed = [...phrases[stage]];

	const handlePrint = () => {
		console.log('Print');
	};

	return (
		<div className={classes.board}>
			<Typetray chars={[]} handlePrint={handlePrint} />
			<Printplate printed={printed} />
			<Source phrase={phrases[stage]} activeChar={activeChar} />
		</div>
	);
};
