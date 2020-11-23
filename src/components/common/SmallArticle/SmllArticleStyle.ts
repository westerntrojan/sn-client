import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		marginBottom: 20,
		wordWrap: 'break-word',

		'&:last-child': {
			marginBottom: 0,
		},

		width: '100%',
	},
	title: {
		marginBottom: 20,
	},
	imageWrapper: {
		lineHeight: 0,
	},
	image: {
		objectFit: 'cover',
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',

		'& button': {
			marginRight: '10px',
		},
	},
	statistics: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	views: {
		marginRight: '10px',
		fontSize: '14px',
		opacity: 0.8,
		display: 'flex',
		alignItems: 'center',
	},
	comments: {
		fontSize: '14px',
		opacity: 0.8,
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: '4px',
	},
});
