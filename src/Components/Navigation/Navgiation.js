/** @format */

import React, { useContext } from 'react';

import { ChevronLeft } from 'react-pangolicons';
import { VolumeMute, VolumeHigh } from 'react-pangolicons';

import { SettingsContext } from '../../Store/Settings.context';

import classes from './Navigation.module.css';

export const Navigation = ({ mode, handleReturnToMenu }) => {
	const ctx = useContext(SettingsContext);

	return (
		<nav className={classes.nav}>
			{mode !== 0 && (
				<button
					className={classes.nav__action_button}
					onClick={handleReturnToMenu}>
					<ChevronLeft strokeWidth={3}></ChevronLeft>
				</button>
			)}
			<button
				style={{ marginLeft: 'auto' }}
				className={classes.nav__action_button}
				onClick={() => {
					ctx.handleAudio(!ctx.audio);
				}}>
				{ctx.audio ? (
					<VolumeHigh strokeWidth={2} />
				) : (
					<VolumeMute strokeWidth={2} />
				)}
			</button>
		</nav>
	);
};
