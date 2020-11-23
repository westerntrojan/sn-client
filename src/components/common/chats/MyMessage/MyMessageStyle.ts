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
	message: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	imageWrapper: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '0 !important',
	},
	image: {
		maxWidth: 500,
		width: '100%',
	},
	messageInfo: {
		display: 'flex',
		alignItems: 'center',
	},
	imageMessageCreated: {
		position: 'absolute',
		color: 'white',
		bottom: 5,
		right: 5,
		backgroundColor: 'rgba(0, 0, 0, .6)',
		borderRadius: 5,
		padding: '2px 5px',
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',

		'& button': {
			marginRight: '10px',
		},
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
}));
