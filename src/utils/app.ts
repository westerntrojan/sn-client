import {Theme} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import moment from 'moment';

export const getCurrentTheme = (): Theme => {
	const theme = localStorage.getItem('theme');

	if (theme) {
		return createMuiTheme(JSON.parse(theme));
	}

	return createMuiTheme({
		palette: {
			type: 'light',
			primary: deepPurple,
		},
	});
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
