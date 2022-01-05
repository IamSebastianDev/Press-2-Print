/** @format */

import React, { useContext } from 'react';
import { SettingsContext } from '../../store/settings-context';

import useSound from 'use-sound';
import hoverFx from '../../assets/sounds/onEnterHover.mp3';
import clickFx from '../../assets/sounds/onClick.mp3';
import { Circle } from 'react-pangolicons';

import classes from './PixelButton.module.css';

export const PixelButton = ({ handleOnClick = null, children }) => {
	const settings = useContext(SettingsContext);

	const attributes = {
		strokeWidth: 5,
		classNames: 'button__svg',
		size: 18,
	};

	const onClick = () => {
		handleOnClick();
		playOnClick({ id: 'click' });
	};

	const [playOnHover] = useSound(hoverFx, {
		playbackRate: 2,
		soundEnabled: settings.audio,
	});
	const [playOnClick] = useSound(clickFx, {
		sprite: {
			click: [400, 500],
		},
		soundEnabled: settings.audio,
	});

	return (
		<button
			className={
				classes.button__pixel +
				' ' +
				(handleOnClick !== null ? classes.button__button : '')
			}
			onFocus={playOnHover}
			onClick={onClick}
			onMouseEnter={playOnHover}>
			<Circle {...attributes} />
			<span className={classes.button__text}>{children}</span>
			<Circle {...attributes} />
		</button>
	);
};
