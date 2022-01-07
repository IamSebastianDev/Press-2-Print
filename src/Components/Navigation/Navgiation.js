/** @format */

import React, { useContext } from 'react';

import { ChevronLeft } from 'react-pangolicons';
import { VolumeMute, VolumeHigh, Italic } from 'react-pangolicons';

import { SettingsContext } from '../../Store/Settings.context';

import classes from './Navigation.module.css';

export const Navigation = ({ mode, handleReturnToMenu }) => {
	const { audio, fonts, handleAudio, handleFonts } =
		useContext(SettingsContext);

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
				style={{
					marginLeft: 'auto',
					color: audio
						? 'var(--ui-clr-text-gold)'
						: 'var(--ui-clr-text-dark-shade)',
				}}
				className={classes.nav__action_button}
				onClick={() => {
					handleAudio(!audio);
				}}>
				{audio ? (
					<VolumeHigh strokeWidth={2} />
				) : (
					<VolumeMute strokeWidth={2} />
				)}
			</button>
			<button
				style={{
					color: fonts
						? 'var(--ui-clr-text-gold)'
						: 'var(--ui-clr-text-dark-shade)',
				}}
				className={classes.nav__action_button}
				onClick={() => {
					handleFonts(!fonts);
				}}>
				<Italic strokeWidth={2} />
			</button>
		</nav>
	);
};
