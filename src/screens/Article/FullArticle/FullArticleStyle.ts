import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	root: {
		wordWrap: 'break-word',
	},
	image: {
		height: '600px',
		cursor: 'pointer',
	},
	video: {
		width: '100%',
		height: '600px',
	},
	audioList: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'column',
	},
	audioItem: {
		padding: '10px 0',
	},
	audioTitle: {
		marginBottom: 8,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	audioTrack: {
		width: '100%',
	},
	content: {
		marginBottom: 20,
		whiteSpace: 'pre-wrap',
	},
	title: {
		marginBottom: 20,
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
		opacity: 0.8,
		display: 'flex',
		alignItems: 'center',
	},
	comments: {
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
