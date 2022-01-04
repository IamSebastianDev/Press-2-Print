/** @format */

import React, { useState, useReducer, useEffect } from 'react';

import classes from './Board.module.css';
import phrases from '../../assets/texts/volgate.js';

import { Typetray } from './Typetray/Typetray';
import { Printplate } from './Printplate/Printplate';
import { Source } from './Source/Source';
import { Score } from './Score/Score';

const availableChars = [...new Set(phrases.join(''))];

export const Board = () => {
	const [gameShouldUpdate, setGameShouldUpdate] = useState(false);
	const [score, setScore] = useState(0);

	const updateGameState = (state, action) => {
		if (action.type === 'startGame') {
			return {
				...state,
				hasStarted: true,
				roundStarted: Date.now(),
				phrase: phrases[0],
				currentStage: 0,
			};
		}

		if (action.type === 'endGame') {
			return {
				...state,
				hasStarted: false,
			};
		}

		if (action.type === 'endRound') {
			return {
				...state,
				roundFinished: true,
			};
		}

		if (action.type === 'nextRound') {
			return {
				...state,
				activeChar: 0,
				printed: [],
				roundFinished: false,
				currentStage: state.currentStage + 1,
				phrase: phrases[state.currentStage + 1],
				roundStarted: Date.now(),
			};
		}

		if (action.type === 'setRandomChars') {
			return {
				...state,
				randomChars: action.payload,
			};
		}

		if (action.type === 'setActiveChar') {
			setGameShouldUpdate(true);
			return {
				...state,
				activeChar: state.activeChar + 1,
			};
		}

		if (action.type === 'addToPrintplate') {
			return {
				...state,
				printed: [...state.printed, action.payload],
			};
		}
	};

	const [gameState, dispatchGameState] = useReducer(updateGameState, {
		hasStarted: false,
		roundFinished: false,
		currentStage: undefined,
		phrase: phrases[0],
		randomChars: [],
		activeChar: 0,
		printed: [],
	});

	const generateRandomChars = ({ currentChar }) => {
		let getChar = () => {
			return availableChars[
				Math.floor(Math.random() * availableChars.length) * 1
			];
		};

		let randomChars = [getChar(), getChar(), getChar()];

		// check if all characters are unique & not the same as the currentChar

		const filteredChars = randomChars.map((char, index) => {
			// get a temporary array without the current char
			let tempArr = randomChars.slice(index);

			// if the rest of the array already has the char or the char is the same as the currentOne, try to get a
			// new random char

			const getNewChar = (charToReplace) => {
				let newChar;

				let tempChar = getChar();
				if (tempChar === charToReplace || tempChar === currentChar) {
					newChar = getNewChar();
				} else {
					newChar = tempChar;
				}

				return newChar;
			};

			if (tempArr.includes(currentChar) || char === currentChar) {
				return getNewChar(char);
			} else {
				return char;
			}
		});

		filteredChars[Math.floor(Math.random() * filteredChars.length) * 1] =
			currentChar;

		return filteredChars;
	};

	useEffect(() => {
		if (!gameShouldUpdate) {
			return;
		}

		nextTick();
	}, [gameState]);

	// tick is the main gameloop function. The next tick is called whenever a character is added to the printed array.
	// the tick checks which character is up next. If it's a space character, the gameloop is skipped, and a space (/
	// character is added automatically. Otherwise, 3 random characters are generated.

	const cleanUpTick = () => {
		dispatchGameState({
			type: 'setActiveChar',
		});
	};

	const nextTick = () => {
		setGameShouldUpdate(false);

		// get the current character to add

		const currentChar = gameState.phrase[gameState.activeChar];

		// check if the round has finished

		if (gameState.activeChar === gameState.phrase.length) {
			console.log('Round end!');

			dispatchGameState({ type: 'endRound' });

			return;
		}

		// generate a new set of random chars

		const randomChars = generateRandomChars({ currentChar });
		dispatchGameState({
			type: 'setRandomChars',
			payload: randomChars,
		});
	};

	const startGame = () => {
		dispatchGameState({
			type: 'startGame',
		});

		nextTick();
	};

	const addDieToPrint = (dieValue) => {
		dispatchGameState({
			type: 'addToPrintplate',
			payload: dieValue,
		});

		cleanUpTick();
	};

	const calculatePoints = () => {
		let points = gameState.printed
			.map((elem, index) => (elem === gameState.phrase[index] ? 10 : 0))
			.reduce((a, b) => a + b);

		let timeElapsed = (
			(Date.now() - gameState.roundStarted) /
			1000
		).toFixed(0);

		setScore((curState) => curState + points - timeElapsed);
	};

	const nextRound = () => {
		// check if this was the last phrase
		if (gameState.currentStage === phrases.length) {
			// return for now, herethe results function needs to go

			return;
		}

		// call the calculate points function

		calculatePoints();

		dispatchGameState({
			type: 'nextRound',
		});

		setGameShouldUpdate(true);
	};

	return (
		<div className={classes.board}>
			<Typetray
				startGame={startGame}
				nextRound={nextRound}
				addDieToPrint={addDieToPrint}
				{...gameState}
			/>
			<Score
				score={score}
				currentStage={gameState.currentStage}
				stages={phrases.length}></Score>
			<Printplate {...gameState} />
			<Source {...gameState} />
		</div>
	);
};
