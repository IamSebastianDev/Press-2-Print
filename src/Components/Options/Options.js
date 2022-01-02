/** @format */

import classes from './Options.module.css';

import { Heading } from '../UI/Heading';
import { List } from '../UI/List';
import { Setting } from './Setting';

export const Options = () => {
	const handleFonts = ({ setting }) => {
		if (setting) {
			document.documentElement.style =
				'--ui-font-fractur: var(--ui-font-accessible); --ui-font-handwritten: var(--ui-font-accessible)';
		} else {
			document.documentElement.style = '';
		}
	};
	return (
		<div>
			<Heading
				heading="Options"
				subheading="You can change some settings here."
			/>
			<List>
				<li>
					<Setting id="fonts" handler={handleFonts} inital={false}>
						More readable fonts?
					</Setting>
				</li>
			</List>
		</div>
	);
};
