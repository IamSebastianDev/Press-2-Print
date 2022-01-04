/** @format */

import React, { useState } from 'react';

// import classes from './Options.module.css';

import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Setting } from './Setting';

export const Options = () => {
	const [settings, setSettings] = useState(
		JSON.parse(localStorage.getItem('p2p-settings')) || {}
	);

	const handleFonts = ({ setting }) => {
		if (!setting) {
			document.documentElement.style =
				'--ui-font-fractur: var(--ui-font-accessible); --ui-font-handwritten: var(--ui-font-accessible)';
		} else {
			document.documentElement.style = '';
		}
	};

	const handleResolution = ({ setting }) => {};
	const handleAnimation = ({ setting }) => {};
	const handleSound = ({ setting }) => {};
	return (
		<div>
			<Heading
				heading="Options"
				subheading="You can change some settings here."
			/>
			<List>
				<li>
					<Setting id="fonts" handler={handleFonts} inital={true}>
						Historically Accurate Fonts?
					</Setting>
				</li>
				<li>
					<Setting
						id="resolution"
						handler={handleResolution}
						inital={true}>
						Use lower resolution?
					</Setting>
				</li>
				<li>
					<Setting
						id="animation"
						handler={handleAnimation}
						inital={true}>
						Enable animations?
					</Setting>
				</li>
				<li>
					<Setting id="sound" handler={handleSound} inital={true}>
						Enable sound?
					</Setting>
				</li>
			</List>
		</div>
	);
};
