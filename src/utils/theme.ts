import {Theme} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import blue from '@material-ui/core/colors/blue';

export const changeTheme = ({
	palette,
	fontSize,
}: {
	palette?: PaletteOptions;
	fontSize?: number;
}): Theme => {
	const currentTheme = JSON.parse(localStorage.getItem('theme') || '');
	const enableAnimations = JSON.parse(localStorage.getItem('enableAnimations') || 'true');

	if (enableAnimations) {
		const newTheme = createMuiTheme({
			palette: palette ? palette : currentTheme.palette,
			typography: {
				fontSize: fontSize ? fontSize : currentTheme.typography.fontSize,
			},
		});

		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	} else {
		const newTheme = createMuiTheme({
			palette: palette ? palette : currentTheme.palette,
			typography: {
				fontSize: fontSize ? fontSize : currentTheme.typography.fontSize,
			},
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
			typography: currentTheme.typography,
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
			typography: currentTheme.typography,
		});

		localStorage.setItem('enableAnimations', 'true');
		localStorage.setItem('theme', JSON.stringify(newTheme));

		return newTheme;
	}
};

export const getDefaultTheme = (): Theme => {
	return createMuiTheme({
		palette: {
			type: 'dark',
			primary: blue,
		},
		typography: {
			// default 14px
			fontSize: 15,
		},
	});
};

export const getCurrentTheme = (): Theme => {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		return createMuiTheme(JSON.parse(currentTheme));
	}

	const newTheme = getDefaultTheme();

	localStorage.setItem('theme', JSON.stringify(newTheme));
	localStorage.setItem('enableAnimations', 'true');

	return newTheme;
};
