/** @format */

import { PixelContainer } from '../UI/PixelContainer';
import { Heading } from '../UI/Heading';
import { TutorialText } from '../UI/TutorialText';
import { Github, Twitter, ExternalLink } from 'react-pangolicons';

import classes from './About.module.css';

export const About = () => {
	return (
		<div style={{ margin: 'auto' }}>
			<Heading heading="About this game:" />
			<PixelContainer>
				<div class={classes.container}>
					<h3>Hey! Thanks for checking out my Game!</h3>
					<p>
						This Game was made for the{' '}
						<a
							href="https://itch.io/jam/historically-accurate-5"
							rel="noreferrer noopener"
							target="_blank"
							title="Historically Accurate Game Jam 5">
							Historically Accurate Game Jam 5
						</a>
						. It's made in HTML5 with the help of React. The Theme
						of the Jam was <strong>"Your Country's History"</strong>
						. This is my entry for 🇩🇪 Germany. It's about the
						invention of the movable type printing press by{' '}
						<a
							href="https://en.wikipedia.org/wiki/Johannes_Gutenberg"
							target="_blank"
							rel="noreferrer noopener">
							Johannes Gutenberg
						</a>{' '}
						around 1450. Gutenberg mostly used the press to print
						his famous Gutenberg bibel, of which there are still
						some left in museums around the world.
					</p>
					<p>
						The text used in the game is the{' '}
						<a
							href="https://en.wikipedia.org/wiki/Vulgate"
							target="_blank"
							rel="noreferrer noopener">
							Vulgate
						</a>{' '}
						which is the latin version of the bible. I would have
						liked to use a non religious text, but historically
						accurate texts from that time that were actually printed
						are pretty hard to find, turns out.
					</p>
					<p>I hope you enjoy this little game!</p>
					<TutorialText />
					<h3>About the creator:</h3>
					<div class={classes.social}>
						<a
							href="https://github.com/iamsebastiandev"
							rel="noreferrer noopener"
							target="_blank"
							title="Creator's Github">
							<Github />
						</a>
						<a
							href="https://twitter.com/iamsebastiandev"
							rel="noreferrer noopener"
							target="_blank"
							title="Creator's Github">
							<Twitter />
						</a>
						<a
							href="https://iamsebastian.dev"
							rel="noreferrer noopener"
							target="_blank"
							title="Creator's Github">
							<ExternalLink />
						</a>
					</div>
				</div>
			</PixelContainer>
		</div>
	);
};
