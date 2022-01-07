/** @format */

import React, { useContext } from 'react';
import { SettingsContext } from '../../Store/Settings.context';

// import classes from './Options.module.css';

import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Setting } from './Setting';

export const Options = () => {
	const ctx = useContext(SettingsContext);

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
						handler={ctx.handleAudio}
						state={ctx.audio}
						description="You can enable some sounds here.">
						Enable sounds?
					</Setting>
				</li>
				<li>
					<Setting
						id="fonts"
						handler={ctx.handleFonts}
						state={ctx.fonts}
						description="They're harder to read but more historically accurate (and fun).">
						Use historic fonts?
					</Setting>
				</li>
			</List>
		</div>
	);
};
