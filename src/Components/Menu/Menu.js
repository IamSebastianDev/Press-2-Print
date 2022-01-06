/** @format */

import { PixelButton } from '../UI/PixelButton';
import { Heading } from '../UI/Heading';
import { List } from '../UI/List';

export const Menu = ({ handleNavigation }) => (
	<div style={{ margin: 'auto' }}>
		<Heading
			heading="Press to Print"
			subheading="A Historically Accurate Typing Game"></Heading>
		<List>
			<li>
				<PixelButton
					onClick={() => {
						handleNavigation({ target: 1 });
					}}>
					Start new Game
				</PixelButton>
			</li>
			<li>
				<PixelButton
					onClick={() => {
						handleNavigation({ target: 2 });
					}}>
					Options
				</PixelButton>
			</li>
			<li>
				<PixelButton
					onClick={() => {
						handleNavigation({ target: 3 });
					}}>
					Highscores
				</PixelButton>
			</li>
			<li>
				<PixelButton
					onClick={() => {
						handleNavigation({ target: 4 });
					}}>
					About
				</PixelButton>
			</li>
		</List>
	</div>
);
