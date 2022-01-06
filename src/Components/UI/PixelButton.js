/** @format */

import React, { useContext } from 'react';
import { SettingsContext } from '../../Store/Settings.context';

import { useSFX } from '../../Scripts/Audio.controller';

import { Circle } from 'react-pangolicons';

import classes from './PixelButton.module.css';

export const PixelButton = ({ onClick = null, children }) => {
	const settings = useContext(SettingsContext);

	const [playOnHover] = useSFX('onHoverFx', {
		soundEnabled: settings.audio,
	});
	const [playOnClick] = useSFX('onClickFx', {
		soundEnabled: settings.audio,
	});

	const attributes = {
		strokeWidth: 5,
		classNames: 'button__svg',
		size: 18,
	};

	const handleOnClick = () => {
		onClick();
		playOnClick();
	};

	return (
		<button
			className={
				classes.button__pixel +
				' ' +
				(onClick !== null ? classes.button__button : '')
			}
			onFocus={playOnHover}
			onMouseEnter={playOnHover}
			onClick={handleOnClick}>
			<Circle {...attributes} />
			<span className={classes.button__text}>{children}</span>
			<Circle {...attributes} />
		</button>
	);
};
