/** @format */

import classes from './TutorialText.module.css';

const Hl = ({ children }) => (
	<strong className={classes.highlighted}>{children}</strong>
);

export const TutorialText = () => {
	return (
		<div className={classes.text}>
			<h3>How to play:</h3>
			<p>
				Drag the <Hl>dies</Hl> from the <Hl>upper left</Hl> to the{' '}
				<Hl>printplate in the lower left</Hl>, matching the{' '}
				<Hl>highlighted character</Hl> on the piece of paper. Once you
				completed the line, hit <Hl>'Print line'</Hl> and advance to the
				next level!
			</p>
		</div>
	);
};
