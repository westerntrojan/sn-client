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

		'& .my-message': {
			backgroundColor:
				theme.palette.type === 'light'
					? fade(theme.palette.primary.main, 0.2)
					: theme.palette.primary.main,
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
}));
