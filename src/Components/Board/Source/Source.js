/** @format */

import { PixelContainer } from '../../UI/PixelContainer';
import classes from './Source.module.css';

export const Source = ({ hasStarted, phrase, activeChar = 0 }) => {
	const chars = [...phrase];

	return (
		<PixelContainer gridArea="leaflet" flexDirection="column">
			<div className={classes.background}>
				{hasStarted &&
					chars.map((elem, index) => (
						<span
							key={index}
							className={
								index === activeChar
									? classes.charActive
									: classes.char
							}>
							{elem.toLowerCase()}
						</span>
					))}
			</div>
		</PixelContainer>
	);
};
