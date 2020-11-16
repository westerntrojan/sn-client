import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
	noInfo: {
		textAlign: 'center',
	},
});

const AuthSubscriptions: React.FC = () => {
	const classes = useStyles();

	return (
		<div className='auth-subscriptions'>
			<div className={classes.noInfo}>
				<Typography variant='h5'>No articles</Typography>
			</div>
		</div>
	);
};

export default AuthSubscriptions;
