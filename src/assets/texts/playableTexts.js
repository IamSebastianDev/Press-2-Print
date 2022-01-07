/** @format */

import debug from './debug';
import vulgate from './vulgate';

const playableTexts = {
	debug,
	vulgate,
};

const activeText = playableTexts.vulgate;

export default playableTexts;
export { activeText };
