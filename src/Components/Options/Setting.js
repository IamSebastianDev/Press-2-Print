/** @format */

import React, { useState } from 'react';

import classes from './Setting.module.css';

export const Setting = ({ handler, id, children, inital }) => {
	const [enabled, setEnabled] = useState(inital);

	/**
	 * @todo: Save settings in local storage and retrieve them from there
	 */

	const dispatchSetting = ({ setting }) => {
		// call the handler method
		setEnabled(setting);
		handler({ setting });
	};

	return (
		<div id={id} className={classes.setting}>
			<span className={classes.label}>{children}</span>
			<div className={classes.button__container}>
				<button
					className={enabled ? classes.button__active : ''}
					onClick={() => {
						dispatchSetting({ setting: true });
					}}>
					On
				</button>
				<button
					onClick={() => {
						dispatchSetting({ setting: false });
					}}
					className={!enabled ? classes.button__active : ''}>
					Off
				</button>
			</div>
		</div>
	);
};
