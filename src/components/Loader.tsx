import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		margin: '20px 0',
		padding: '10px',
	},
}));

const CircularIndeterminate: React.FC = () => {
	const classes = useStyles();

	return (
		<aside className={classes.root}>
			<CircularProgress />
		</aside>
	);
};

export default CircularIndeterminate;
