/** @format */

import React from 'react';

export const SettingsContext = React.createContext({
	audio: false,
	handleAudio: () => {},
	animation: true,
	handleAnimation: () => {},
	fonts: true,
	handleFonts: () => {},
});
