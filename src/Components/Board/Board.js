/** @format */

import React, { useState, useReducer, useContext, useEffect } from 'react';
import { SettingsContext } from '../../store/settings-context';
import { useSFX } from '../../utils/audio.controller';

// import React components
import { PixelContainer } from '../UI/PixelContainer';
import { Printplate } from './Printplate/Printplate';
import { Typetray } from './Typetray/Typetray';
import { Source } from './Source/Source';
import { Score } from './Score/Score';

import classes from './Board.module.css';

// import and distribute the texts

import playableTexts from '../../assets/texts/playableTexts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const phrases = playableTexts.test;

// generate a set of existing characters out of the supplied text
const availableChars = [...new Set(phrases.join(''))];

export const Board = () => {
	// initalize the sounds used in the game and it's settings

	const { audio } = useContext(SettingsContext);
	const [playbackRate, setPlaybackRate] = useState(1);

	const [playOnLevelComplete] = useSFX('onLevelCompleteFx', {
		soundEnabled: audio,
	});
	const [playOnDrop] = useSFX('onDropFx', {
		soundEnabled: audio,
		playbackRate,
	});

	// utility method to generate a set of random characters

	const generateRandomChars = ({ currentChar }) => {
		// the difficulty describes the amount of dies added to the typetray
		const DIFFICULTY = 3;

		// method to get a random character out of the available characters
		const getChar = () =>
			availableChars[
				Math.floor(Math.random() * availableChars.length) * 1
			];

		// method to get a random set of characters with the length of the difficulty
		const getRandomChars = () =>
			[...new Array(DIFFICULTY)].map(() => getChar());

		// method to generate a array with the length of the difficulty that
		// contains only unique characters and no repeats and of which one random
		// character is the needed character. The method will call it self
		// recursively unitl such a array is found

		const getRandomArray = ({ currentChar }) => {
			// A new Array is generated and subsequently checked for it's uniqueness
			// after inserting the supplied character.

			const arrayOfChars = getRandomChars();
			arrayOfChars[Math.floor(Math.random() * arrayOfChars.length) * 1] =
				currentChar;

			if ([...new Set(arrayOfChars)].length !== DIFFICULTY) {
				return getRandomArray({ currentChar });
			}

			return arrayOfChars;
		};

		// return the Array
		return getRandomArray({ currentChar });
	};

	// the main gameLoop

	const nextTick = () => {
		const { phrases, currentStage, activeChar } = gameState;

		// check if the round should end because all characters have been added
		if (activeChar === phrases[currentStage].length) {
			dispatchGameState({ type: 'endRound' });
			return;
		}

		// get the next character to add to the typetray

		const currentChar = phrases[currentStage][activeChar];

		// generate a new set of random chars
		const randomChars = generateRandomChars({ currentChar });
		dispatchGameState({
			type: 'setRandomChars',
			payload: randomChars,
		});
	};

	// the inital gameState

	const initalGameState = {
		// describes if the game is currently started
		hasStarted: false,
		// describes if the game has ended
		hasEnded: false,
		// timestamps the current round to track points
		roundStarted: undefined,
		// describes if a round has been finished
		roundHasFinished: false,
		// describes the current stage of the level
		currentStage: 0,
		// holds the current Text of the gameState
		phrases: phrases,
		// holds the randomly generated characters for the choice
		randomChars: [],
		// describes the index of the currently active character
		activeChar: 0,
		// holds all so far printed chars
		printed: [],
		// is the ID of the current gameState
		id: Math.random().toString(36).substring(2, 9),
		// the current Score
		score: 0,
		// the last assigned score
		scoreDifference: 0,
		// describes if the visual gameState should be updated
		requestedUpdate: false,
	};

	// the reducer function that is used to update the gameState

	const updateGameState = (state, { type, payload }) => {
		let newState = { ...state, requestedUpdate: false };

		switch (type) {
			case 'startGame':
				newState = {
					...initalGameState,
					hasStarted: true,
					requestedUpdate: true,
					roundStarted: Date.now(),
				};
				break;
			case 'endGame':
				newState = { ...newState, hasStarted: false, hasEnded: true };
				break;
			case 'endRound':
				newState = { ...newState, roundHasFinished: true };
				break;
			case 'nextRound':
				newState = {
					...newState,
					activeChar: 0,
					printed: [],
					roundHasFinished: false,
					currentStage: state.currentStage + 1,
					roundStarted: Date.now(),
					requestedUpdate: true,
				};
				break;
			case 'setRandomChars':
				newState = { ...newState, randomChars: payload };
				break;
			case 'addDieToPrintplate':
				newState = {
					...newState,
					printed: [...state.printed, payload],
					requestedUpdate: true,
					activeChar: state.activeChar + 1,
				};
				break;
			case 'setScore':
				newState = {
					...newState,
					score:
						state.score + payload > 0 ? state.score + payload : 0,
					scoreDifference: payload,
				};
				break;
			default:
				// if the type of the dispatch is not recognized, throw a
				// new Error logging the type to the console for debugging

				throw new Error(
					`GameState: Encountered unknown action type: ${type}`
				);
		}

		return newState;
	};

	const [gameState, dispatchGameState] = useReducer(
		updateGameState,
		initalGameState
	);

	const handleStartGame = () => {
		dispatchGameState({ type: 'startGame' });
	};

	// utility method to store the highscore in local storage

	const saveHighscore = ({ id, currentStage, score, phrases }) => {
		// construct the score to be saved
		const scoreToSave = {
			id,
			score,
			currentStage: currentStage + 1,
			maximumStage: phrases?.length,
			timeStamp: Date.now(),
		};

		// retrieve the scores currently saved in the local storage or
		// if no scores can be found, create a new empty Array
		const storedScores =
			JSON.parse(localStorage.getItem('p2p-highscores')) || [];

		// find the currently active score object
		const currentScoreIndex = storedScores.findIndex(
			(elem) => elem.id === scoreToSave.id
		);

		// if no score could be found, push the score to the storedScores Array.
		// Otherwise, overwrite the object at the found index.
		if (currentScoreIndex === -1) {
			storedScores.push(scoreToSave);
		} else {
			storedScores[currentScoreIndex] = scoreToSave;
		}

		// store the updated Array in the local storage
		localStorage.setItem('p2p-highscores', JSON.stringify(storedScores));
	};

	const handleEndGame = () => {
		// dispatch the updated game State

		dispatchGameState({ type: 'endGame' });
	};

	// utility method to add points to the gameState object

	const setScore = (pointsToAdd) => {
		dispatchGameState({
			type: 'setScore',
			payload: Math.floor(pointsToAdd),
		});
	};

	// utility method to calculate the amount of points to add to the score
	// at the end of the round.

	const calculateEndOfRoundPoints = ({ roundStarted, currentPhrase }) => {
		// time it took to finish the round in seconds
		const timeToFinish = (Date.now() - roundStarted) / 1000;
		// allot 5 seconds for each character
		const allotedTime = currentPhrase.length * 5;

		return allotedTime - timeToFinish;
	};

	const handleNextRound = () => {
		// play the level complete sound
		playOnLevelComplete();

		// add the points of the current round to the score property
		// of the gameState object and save it into the highscores storage
		const roundStarted = gameState.roundStarted;
		const currentPhrase = gameState.phrases[gameState.currentStage];
		setScore(calculateEndOfRoundPoints({ roundStarted, currentPhrase }));
		saveHighscore(gameState);

		// check if the game is over. If it is, end the round
		if (gameState.currentStage === gameState.phrases.length - 1) {
			handleEndGame();
			return;
		}

		// if the game is not over, dispatch the nextRound
		dispatchGameState({ type: 'nextRound' });
	};

	const handleAddDieToPrintplate = ({ dieValue, expectedDieValue }) => {
		// add Points granularly by checking if the dieValue is equal to the supposed
		// value. A correct die adds 10 points, a wrong die subtracts 5

		setScore(expectedDieValue === dieValue ? 10 : -5);

		// dispatch the gameState to add the character to the gameState
		dispatchGameState({ type: 'addDieToPrintplate', payload: dieValue });

		// play the drop soundFX after setting a slightly random playbackrate
		setPlaybackRate(Math.random() * 0.5 + 0.75);
		playOnDrop();
	};

	// check the gameState for updates and changes, then request the next tick if the game requests the update
	useEffect(() => {
		if (gameState.hasEnded) {
			saveHighscore(gameState);
			return;
		}

		if (!gameState.requestedUpdate) {
			return;
		}

		nextTick();
	});

	return (
		<div className={classes.board}>
			<DndProvider backend={HTML5Backend}>
				<PixelContainer gridArea="typetray">
					<Typetray
						{...gameState}
						onStartGame={handleStartGame}
						onNextRound={handleNextRound}
					/>
				</PixelContainer>
				<PixelContainer gridArea="printplate">
					<Printplate
						{...gameState}
						onAddDieToPrintplate={handleAddDieToPrintplate}
					/>
				</PixelContainer>
			</DndProvider>
			<PixelContainer gridarea="scoredisplay">
				<Score {...gameState} />
			</PixelContainer>
			<PixelContainer gridarea="sourcedisplay">
				<Source {...gameState} />
			</PixelContainer>
		</div>
	);
};
