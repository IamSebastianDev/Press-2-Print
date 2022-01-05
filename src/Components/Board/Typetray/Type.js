/** @format */

import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-dnd';

import classes from './Type.module.css';

export const Type = ({ children }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'die',
		item: {
			children,
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const props = useSpring({
		to: {
			opacity: 1,
			transform: 'scale(1) translateY(0)',
			borderColor: 'var(--ui-clr-text-dark-shade)',
		},
		from: {
			opacity: 0,
			transform: 'scale(1.1) translateY(-10px)',
			borderColor: 'var(--ui-clr-text-gold)',
		},
	});

	return (
		<animated.span
			ref={drag}
			style={{ ...props, opacity: isDragging ? '0' : '1' }}
			className={classes.type}>
			{children}
		</animated.span>
	);
};
