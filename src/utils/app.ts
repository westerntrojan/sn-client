import {Theme} from '@material-ui/core';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import deepPurple from '@material-ui/core/colors/deepPurple';
import moment from 'moment';

export const changeTheme = (palette: PaletteOptions): Theme => {
	const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

	if (enableAnimations) {
		const newTheme = responsiveFontSizes(
			createMuiTheme({
				palette,
			}),
		);

		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	} else {
		const newTheme = responsiveFontSizes(
			createMuiTheme({
				palette,
				transitions: {
					create: (): string => 'none',
				},
				props: {
					MuiButtonBase: {
						disableRipple: true,
					},
				},
				overrides: {
					MuiCssBaseline: {
						'@global': {
							'*, *::before, *::after': {
								transition: 'none !important',
								animation: 'none !important',
							},
						},
					},
				},
			}),
		);

		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	}
};

export const changeThemeAnimations = (): Theme => {
	const currentTheme = JSON.parse(localStorage.getItem('theme') || '');
	const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

	if (enableAnimations) {
		const newTheme = responsiveFontSizes(
			createMuiTheme({
				palette: currentTheme.palette,
				transitions: {
					create: (): string => 'none',
				},
				props: {
					MuiButtonBase: {
						disableRipple: true,
					},
				},
				overrides: {
					MuiCssBaseline: {
						'@global': {
							'*, *::before, *::after': {
								transition: 'none !important',
								animation: 'none !important',
							},
						},
					},
				},
			}),
		);

		localStorage.setItem('enableAnimations', 'false');
		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	} else {
		const newTheme = responsiveFontSizes(
			createMuiTheme({
				palette: currentTheme.palette,
			}),
		);

		localStorage.setItem('enableAnimations', 'true');
		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	}
};

export const getCurrentTheme = (): Theme => {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		return responsiveFontSizes(createMuiTheme(JSON.parse(currentTheme)));
	}

	const newTheme = responsiveFontSizes(
		createMuiTheme({
			palette: {
				type: 'light',
				primary: deepPurple,
			},
		}),
	);

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
