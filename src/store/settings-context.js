/** @format */

import React from 'react';

export const SettingsContext = React.createContext({
	audio: false,
	handleAudio: () => {},
	animation: true,
	fonts: true,
	handleFonts: () => {},
	betterResolution: false,
});
