import {Theme} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import moment from 'moment';

export const getCurrentTheme = (): Theme => {
	const theme = localStorage.getItem('theme');

	if (theme) {
		return createMuiTheme(JSON.parse(theme));
	}

	return createMuiTheme({
		palette: {
			type: 'light',
			primary: blue,
		},
	});
};

export const drawer = (location: {pathname: string}): boolean => {
	const pathname = location.pathname;
	const withoutParams = pathname.slice(0, pathname.lastIndexOf('/'));

	if (
		pathname === '/' ||
		pathname === '/chat' ||
		pathname === '/article/add' ||
		pathname === '/messages' ||
		pathname === '/admin/dashboard' ||
		pathname === '/admin' ||
		withoutParams === '/category' ||
		withoutParams === '/tag'
	) {
		return true;
	}

	return false;
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
