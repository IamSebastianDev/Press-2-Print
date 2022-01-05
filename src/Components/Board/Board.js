/** @format */

import React, { useState, useReducer, useEffect } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useSound from 'use-sound';
import onDropFx from '../../assets/sounds/onDrop.mp3';

import classes from './Board.module.css';
// import phrases from '../../assets/texts/volgate.js';
import phrases from '../../assets/texts/testText.js';

import { Typetray } from './Typetray/Typetray';
import { Printplate } from './Printplate/Printplate';
import { Source } from './Source/Source';
import { Score } from './Score/Score';

const availableChars = [...new Set(phrases.join(''))];

export const Board = () => {
	const [playbackRate, setPlaybackRate] = useState(1);
	const [playOnDrop] = useSound(onDropFx, {
		sprite: {
			drop: [0, 200],
		},
		playbackRate,
	});

	const [gameShouldUpdate, setGameShouldUpdate] = useState(false);
	const [score, setScore] = useState(0);
	const [scoreDif, setScoreDif] = useState(0);

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
				hasEnded: true,
				phrase: phrases[0],
				currentStage: 0,
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
			setPlaybackRate(Math.random() * 0.5 + 0.75);
			playOnDrop({
				id: 'drop',
			});

			return {
				...state,
				printed: [...state.printed, action.payload],
			};
		}
	};

	const [gameState, dispatchGameState] = useReducer(updateGameState, {
		hasStarted: false,
		hasEnded: false,
		roundFinished: false,
		currentStage: 0,
		phrase: phrases[0],
		randomChars: [],
		activeChar: 0,
		printed: [],
		id: '_' + Math.random().toString(36).substring(2, 9),
	});

	const generateRandomChars = ({ currentChar }) => {
		const difficulty = 3;
		let getChar = () =>
			availableChars[
				Math.floor(Math.random() * availableChars.length) * 1
			];

		const getRandomChars = () =>
			[...new Array(difficulty)].map(() => getChar());

		const getRandomArray = ({ currentChar }) => {
			let randomChars = getRandomChars();
			randomChars[Math.floor(Math.random() * randomChars.length) * 1] =
				currentChar;

			return [...new Set(randomChars)].length !== difficulty
				? getRandomArray({ currentChar })
				: randomChars;
		};

		// check if the

		return getRandomArray({ currentChar });
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

	const addPoints = (points) => {
		setScoreDif(points);
		setScore((curScore) => curScore + points);
	};

	const addDieToPrint = (dieValue, supposedValue) => {
		// add points granularly by checking if the dieValue is equal to the value it should have
		addPoints(supposedValue === dieValue ? 10 : -5);

		dispatchGameState({
			type: 'addToPrintplate',
			payload: dieValue,
		});

		cleanUpTick();
	};

	const calculateEndOfRoundPoints = ({ gameState }) => {
		// time to finish the round in seconds
		const timeToFinish = (Date.now() - gameState.roundStarted) / 1000;
		// set 5 seconds for each character
		const allotedTime = gameState.phrase.length * 5;

		return Math.floor(allotedTime - timeToFinish);
	};

	const setHighScores = ({ gameState }) => {
		const curScore = {
			_id: gameState.id,
			timestamp: Date.now(),
			curLevel: gameState.currentStage + 1,
			levelCount: phrases.length,
			score,
		};

		const currentHighscores =
			JSON.parse(window.localStorage.getItem('p2p-highscores')) || [];

		const scoreIndex = currentHighscores.findIndex(
			(elem) => elem._id === gameState.id
		);

		if (scoreIndex !== -1) {
			currentHighscores[scoreIndex] = curScore;
		} else {
			currentHighscores.push(curScore);
		}

		window.localStorage.setItem(
			'p2p-highscores',
			JSON.stringify(currentHighscores)
		);
	};

	const nextRound = () => {
		// add the highscore to the localStorage

		addPoints(calculateEndOfRoundPoints({ gameState }));

		// set highscores
		setHighScores({ gameState });

		// check if this was the last phrase
		if (gameState.currentStage === phrases.length) {
			// return for now, herethe results function needs to go

			dispatchGameState({
				type: 'endGame',
			});

			console.log('You won!');
			return;
		}

		dispatchGameState({
			type: 'nextRound',
		});

		setGameShouldUpdate(true);
	};

	return !gameState.hasEnded ? (
		<div className={classes.board}>
			<DndProvider backend={HTML5Backend}>
				<Typetray
					startGame={startGame}
					nextRound={nextRound}
					{...gameState}
				/>
				<Printplate {...gameState} addDieToPrintPlate={addDieToPrint} />
			</DndProvider>
			<Score
				score={score}
				scoreDif={scoreDif}
				currentStage={gameState.currentStage}
				stages={phrases.length}
			/>
			<Source {...gameState} />
		</div>
	) : (
		<div>You won! Final score: {score}</div>
	);
};
