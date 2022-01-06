/** @format */

// import the useSound hook
import useSound from 'use-sound';

// import the Audiofiles
import onClickFx from '../assets/sounds/onClick.mp3';
import onHoverFx from '../assets/sounds/onHover.mp3';
import onDropFx from '../assets/sounds/onDrop.mp3';
import onLevelCompleteFx from '../assets/sounds/onLevelComplete.mp3';
import onToggleFx from '../assets/sounds/onToggle.mp3';

// manage the audio files and assign aliases if desired

const audioFiles = {
	onClickFx,
	onHoverFx,
	onDropFx,
	onLevelCompleteFx,
	onToggleFx,
};

export const useSFX = (name, config) => useSound(audioFiles[name], config);
