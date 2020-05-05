import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: 10000,
	},
});

const PageLoader: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<LinearProgress />
		</div>
	);
};

export default PageLoader;
