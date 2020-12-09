import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles(theme => ({
	root: {
		padding: '5px 10px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 0,
		cursor: 'pointer',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		'& .MuiCard-root': {
			marginLeft: 10,
			width: 'fit-content',
			borderRadius: '5px',
			minWidth: '200px',
			maxWidth: '100%',
			backgroundColor:
				theme.palette.type === 'light'
					? fade(theme.palette.primary.main, 0.2)
					: theme.palette.primary.main,
			'& .MuiCardContent-root': {
				padding: '5px 10px',
			},
			'& .MuiCardActions-root': {
				padding: '5px 10px',
			},
		},
	},
	selectedRoot: {
		backgroundColor: fade(theme.palette.primary.main, 0.2),
	},
	checkIcon: {
		opacity: 0,
	},
	hoverCheckIcon: {
		opacity: 0.6,
	},
	activeCheckIcon: {
		opacity: 1,
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	info: {
		display: 'flex',
		alignItems: 'center',
		opacity: 0.8,
	},
}));
