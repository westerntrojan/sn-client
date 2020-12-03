import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	root: {
		padding: '10px',
	},
	info: {
		opacity: 0.8,
	},
}));

const Footer: React.FC = () => {
	const classes = useStyles();

	return (
		<>
			<Divider />

			<footer className={classes.root}>
				<Typography variant='caption' className={classes.info}>
					© {new Date().getFullYear()} {process.env.REACT_APP_TITLE}, LLC
				</Typography>
			</footer>
		</>
	);
};

export default Footer;
