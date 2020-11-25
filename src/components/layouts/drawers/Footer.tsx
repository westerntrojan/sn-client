import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
	root: {
		padding: '10px',
	},
	info: {
		fontSize: '12px',
		opacity: 0.8,
	},
}));

const Footer: React.FC = () => {
	const classes = useStyles();

	return (
		<>
			<Divider />

			<footer className={classes.root}>
				<span className={classes.info}>
					© {new Date().getFullYear()} {process.env.REACT_APP_TITLE}, LLC
				</span>
			</footer>
		</>
	);
};

export default Footer;
