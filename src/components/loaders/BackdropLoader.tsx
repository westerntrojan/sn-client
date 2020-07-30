import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';

import Loader from './Loader';

const useStyles = makeStyles(theme => ({
	root: {
		zIndex: theme.zIndex.drawer + 3,
	},
}));

type Props = {
	open: boolean;
};

const BackdropLoader: React.FC<Props> = ({open}) => {
	const classes = useStyles();

	return (
		<Backdrop open={open} className={classes.root}>
			<Loader disableMargin />
		</Backdrop>
	);
};

export default BackdropLoader;
