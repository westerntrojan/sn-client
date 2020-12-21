import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {Color} from '@material-ui/core';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import FontSizeSlider from './FontSizeSlider';

const useStyles = makeStyles(theme => ({
	dialogTitle: {
		margin: 0,
		paddingTop: theme.spacing(2),
		paddingBotttom: theme.spacing(2),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
	closeIcon: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	formControl: {
		display: 'flex',
		margin: '20px 0',
	},
	group: {
		display: 'flex',
		flexDirection: 'row',
	},
	redRoot: {
		color: red[600],
		'&$checked': {
			color: red[500],
		},
	},
	orangeRoot: {
		color: deepOrange[600],
		'&$checked': {
			color: deepOrange[500],
		},
	},
	amberRoot: {
		color: amber[600],
		'&$checked': {
			color: amber[500],
		},
	},
	greenRoot: {
		color: green[600],
		'&$checked': {
			color: green[500],
		},
	},
	blueRoot: {
		color: blue[600],
		'&$checked': {
			color: blue[500],
		},
	},
	indigoRoot: {
		color: indigo[600],
		'&$checked': {
			color: indigo[500],
		},
	},
	deepPurpleRoot: {
		color: deepPurple[600],
		'&$checked': {
			color: deepPurple[500],
		},
	},
	checked: {},
	dialogActions: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

type Props = {
	open: boolean;
	closeModal: () => void;
	handleChangeTheme: ({palette, fontSize}: {palette?: PaletteOptions; fontSize?: number}) => void;
	handleResetTheme: () => void;
};

const ThemePickerModal: React.FC<Props> = ({
	open,
	closeModal,
	handleChangeTheme,
	handleResetTheme,
}) => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const getColorString = (value: string): string => {
		switch (value) {
			case red['500']:
				return 'red';
			case deepOrange['500']:
				return 'orange';
			case amber['500']:
				return 'amber';
			case green['500']:
				return 'green';
			case blue['500']:
				return 'blue';
			case indigo['500']:
				return 'indigo';
			case deepPurple['500']:
				return 'deepPurple';
			default:
				return 'red';
		}
	};

	const getColor = (value: string): Color => {
		switch (value) {
			case 'red':
				return red;
			case 'deepOrange':
				return deepOrange;
			case 'amber':
				return amber;
			case 'green':
				return green;
			case 'blue':
				return blue;
			case 'indigo':
				return indigo;
			case 'deepPurple':
				return deepPurple;
			default:
				return red;
		}
	};

	const getThemeType = (value: string): 'dark' | 'light' => {
		if (value === 'dark') {
			return 'dark';
		}

		return 'light';
	};

	const [typeTheme, setTypeTheme] = useState<'dark' | 'light'>(theme.palette.type);
	const [primaryColor, setPrimaryColor] = useState<string>(
		getColorString(theme.palette.primary.main),
	);

	const handleChangeTypeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = getThemeType(e.target.value);

		setTypeTheme(value);

		handleChangeTheme({
			palette: {
				type: value,
				primary: getColor(primaryColor),
			},
		});
	};

	const handleChangePrimaryColor = (e: React.ChangeEvent<{value: unknown}>) => {
		const value = e.target.value as string;

		setPrimaryColor(value);

		handleChangeTheme({
			palette: {
				type: typeTheme,
				primary: getColor(value),
			},
		});
	};

	return (
		<Dialog open={open} onClose={closeModal} fullScreen={fullScreen} fullWidth>
			<DialogTitle className={classes.dialogTitle} disableTypography>
				<Typography variant='h6'>Appearance</Typography>

				<IconButton className={classes.closeIcon} onClick={closeModal} color='primary'>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<FontSizeSlider handleChangeTheme={handleChangeTheme} />

				<FormControl component='fieldset' className={classes.formControl}>
					<FormLabel focused component='legend' style={{marginBottom: 10}}>
						Color
					</FormLabel>
					<RadioGroup
						className={classes.group}
						value={primaryColor}
						onChange={handleChangePrimaryColor}
					>
						<FormControlLabel
							value='blue'
							control={
								<Radio
									classes={{
										root: classes.blueRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Blue'
						/>
						<FormControlLabel
							value='red'
							control={
								<Radio
									classes={{
										root: classes.redRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Red'
						/>
						<FormControlLabel
							value='deepOrange'
							control={
								<Radio
									classes={{
										root: classes.orangeRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Orange'
						/>
						<FormControlLabel
							value='amber'
							control={
								<Radio
									classes={{
										root: classes.amberRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Amber'
						/>
						<FormControlLabel
							value='green'
							control={
								<Radio
									classes={{
										root: classes.greenRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Green'
						/>
						<FormControlLabel
							value='indigo'
							control={
								<Radio
									classes={{
										root: classes.indigoRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Indigo'
						/>
						<FormControlLabel
							value='deepPurple'
							control={
								<Radio
									classes={{
										root: classes.deepPurpleRoot,
										checked: classes.checked,
									}}
								/>
							}
							label='Purple'
						/>
					</RadioGroup>
				</FormControl>

				<FormControl component='fieldset' className={classes.formControl}>
					<FormLabel focused component='legend' style={{marginBottom: 10}}>
						Theme
					</FormLabel>

					<RadioGroup value={typeTheme} className={classes.group} onChange={handleChangeTypeTheme}>
						<FormControlLabel value='light' control={<Radio color='primary' />} label='Light' />
						<FormControlLabel value='dark' control={<Radio color='primary' />} label='Dark' />
					</RadioGroup>
				</FormControl>
			</DialogContent>

			<DialogActions className={classes.dialogActions}>
				<Button color='primary' onClick={handleResetTheme}>
					Reset theme
				</Button>
				<Button color='primary' onClick={closeModal}>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ThemePickerModal;
