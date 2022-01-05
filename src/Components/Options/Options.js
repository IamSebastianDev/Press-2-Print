/** @format */

import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../store/settings-context';

// import classes from './Options.module.css';

import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Setting } from './Setting';

export const Options = () => {
	const ctx = useContext(SettingsContext);

	const handleAudio = ({ setting }) => {
		ctx.handleAudio(setting);
	};

	return (
		<div>
			<Heading
				heading="Options"
				subheading="You can change some settings here."
			/>
			<List>
				<li>
					<Setting
						id="audio"
						handler={handleAudio}
						inital={ctx.audio}>
						Sounds
					</Setting>
				</li>
			</List>
		</div>
	);
};
