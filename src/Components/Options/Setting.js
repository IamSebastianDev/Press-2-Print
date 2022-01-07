/** @format */

import React, { useContext } from 'react';
import { useSFX } from '../../Scripts/Audio.controller';
import { SettingsContext } from '../../Store/Settings.context';

import classes from './Setting.module.css';

export const Setting = ({ handler, id, children, state, description }) => {
	const { audio } = useContext(SettingsContext);

	const [playOnToggle] = useSFX('onToggleFx', {
		soundEnabled: audio,
	});

	const dispatchSetting = ({ setting }) => {
		playOnToggle();
		handler(setting);
	};

	return (
		<div id={id} className={classes.setting}>
			<div className={classes.text__container}>
				<span className={classes.label}>{children}</span>
				<span>{description}</span>
			</div>
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
