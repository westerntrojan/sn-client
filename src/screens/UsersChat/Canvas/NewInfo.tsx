import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		padding: 20,
		backgroundColor: theme.palette.background.default,
	},
}));

const NewInfo: React.FC = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.root}>
			<Typography>The correspondence history will be displayed here.</Typography>
		</Paper>
	);
};

export default NewInfo;
