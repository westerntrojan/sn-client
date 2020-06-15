import {Theme} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import moment from 'moment';

export const getCurrentTheme = (): Theme => {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		return createMuiTheme(JSON.parse(currentTheme));
	}

	const newTheme = createMuiTheme({
		palette: {
			type: 'light',
			primary: deepPurple,
		},
	});

	localStorage.setItem('theme', JSON.stringify(newTheme));
	localStorage.setItem('enableAnimations', 'true');

	return newTheme;
};

export const relativeDate = (date: string): string => {
	const currentDate = new Date();

	const currentDay = moment(date).isoWeekday() === moment(currentDate).isoWeekday();
	const currentWeek = moment(date).isoWeek() === moment(currentDate).isoWeek();

	if (currentDay) {
		return new Date(date).toLocaleTimeString().slice(0, -3);
	} else if (currentWeek) {
		return moment(date).format('ddd');
	} else {
		return new Date(date).toLocaleDateString();
	}
};
