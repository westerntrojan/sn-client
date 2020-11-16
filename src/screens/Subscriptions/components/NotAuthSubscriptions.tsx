import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

import SignInButton from '@components/common/SignInButton';

const useStyles = makeStyles({
	root: {
		flex: 1,
		paddingTop: 140,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		marginBottom: 20,
	},
	subTitle: {
		marginBottom: 20,
	},
});

const NotAuthSubscriptions: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant='h3' className={classes.title}>
				Don’t miss your articles
			</Typography>
			<Typography variant='h5' className={classes.subTitle}>
				Sign in to see articles from your favorite authors
			</Typography>

			<SignInButton />
		</div>
	);
};

export default NotAuthSubscriptions;
