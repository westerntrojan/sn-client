import {Theme} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import blue from '@material-ui/core/colors/blue';

export const changeTheme = (palette: PaletteOptions): Theme => {
	const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

	if (enableAnimations) {
		const newTheme = createMuiTheme({
			palette,
		});

		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	} else {
		const newTheme = createMuiTheme({
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
		});

		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	}
};

export const changeThemeAnimations = (): Theme => {
	const currentTheme = JSON.parse(localStorage.getItem('theme') || '');
	const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

	if (enableAnimations) {
		const newTheme = createMuiTheme({
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
		});

		localStorage.setItem('enableAnimations', 'false');
		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	} else {
		const newTheme = createMuiTheme({
			palette: currentTheme.palette,
		});

		localStorage.setItem('enableAnimations', 'true');
		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	}
};

export const getCurrentTheme = (): Theme => {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		return createMuiTheme(JSON.parse(currentTheme));
	}

	const newTheme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: blue,
		},
	});

	localStorage.setItem('theme', JSON.stringify(newTheme));
	localStorage.setItem('enableAnimations', 'true');

	return newTheme;
};
