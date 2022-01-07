/** @format */

import React, { useState } from 'react';

import './App.css';

import { Navigation } from './Components/Navigation/Navgiation';
import { Scene } from './Components/UI/Scene';
import { Menu } from './Components/Menu/Menu';
import { Board } from './Components/Board/Board';
import { Options } from './Components/Options/Options';
import { Highscores } from './Components/Highscores/Highscores';
import { About } from './Components/About/About';

import { SettingsContext } from './Store/Settings.context';

export const App = () => {
	const [mode, setMode] = useState(0);
	const setScene = ({ target }) => {
		setMode(target);
	};

	const [audio, setAudio] = useState(false);
	const handleAudio = (value) => {
		setAudio(value);
	};

	const [fonts, setFonts] = useState(true);
	const handleFonts = (value) => {
		document.documentElement.classList.toggle('fontsHistoric', value);
		setFonts(value);
	};

	/**
	 * @description method to handle the return to the main menu. This will be the only navigation method, as all other
	 * scenes are just one level deep. All actions required to return to the menu can go in this method
	 */

	const returnToMenu = () => {
		setScene({ target: 0 });
	};

	const Scenes = [
		<Scene id="game-menu">
			<Menu handleNavigation={setScene} />
		</Scene>,
		<Scene id="game-board">
			<Board />
		</Scene>,
		<Scene id="game-options">
			<Options />
		</Scene>,
		<Scene id="game-highscores">
			<Highscores />
		</Scene>,
		<Scene id="game-about">
			<About />
		</Scene>,
	];

	return (
		<SettingsContext.Provider
			value={{
				audio,
				handleAudio,
				fonts,
				handleFonts,
			}}>
			<div>
				<Navigation mode={mode} handleReturnToMenu={returnToMenu} />
				{Scenes[mode]}
			</div>
		</SettingsContext.Provider>
	);
};
