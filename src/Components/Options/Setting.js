/** @format */

import React, { useContext } from 'react';
import useSound from 'use-sound';
import onToggleFx from '../../assets/sounds/onToggle.mp3';
import { SettingsContext } from '../../store/settings-context';

import classes from './Setting.module.css';

export const Setting = ({ handler, id, children, state }) => {
	const { audio } = useContext(SettingsContext);

	const [play] = useSound(onToggleFx, {
		soundEnabled: audio,
	});

	const dispatchSetting = ({ setting }) => {
		play();
		// call the handler method
		handler(setting);
	};

	return (
		<div id={id} className={classes.setting}>
			<span className={classes.label}>{children}</span>
			<div className={classes.button__container}>
				<button
					className={state ? classes.button__active : ''}
					onClick={() => {
						dispatchSetting({ setting: true });
					}}>
					On
				</button>
				<button
					onClick={() => {
						dispatchSetting({ setting: false });
					}}
					className={!state ? classes.button__active : ''}>
					Off
				</button>
			</div>
		</div>
	);
};
