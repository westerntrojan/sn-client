import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	root: {
		wordWrap: 'break-word',
	},
	media: {
		height: '600px',
		cursor: 'pointer',
	},
	content: {
		marginBottom: 20,
		whiteSpace: 'pre-wrap',
	},
	title: {
		marginBottom: '10px',
	},
	linkIcon: {
		transform: 'rotate(135deg)',
	},
	tags: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: 20,
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	actions: {
		display: 'flex',
	},
	author: {
		marginTop: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '10px',

		border: `1px solid ${theme.palette.primary.main}`,
	},
	authorInfo: {
		display: 'flex',
		alignItems: 'center',

		'& .avatar': {
			marginRight: 10,
		},
	},
	rating: {
		display: 'flex',
		marginRight: 40,
	},
	likes: {
		marginRight: 10,
	},
	dislikes: {},
	bookmarks: {
		display: 'flex',
		alignItems: 'center',
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

	[theme.breakpoints.down('sm')]: {
		author: {
			flexWrap: 'wrap',
		},

		followButton: {
			width: '100%',
			marginTop: 10,
		},
	},

	[theme.breakpoints.down('xs')]: {
		rating: {
			marginRight: 0,
		},
		likes: {
			marginRight: 0,
		},

		statistics: {
			display: 'none',
		},
	},
}));
