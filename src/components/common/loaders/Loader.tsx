import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

type Props = {
	disableMargin?: boolean;
};

const Loader: React.FC<Props> = ({disableMargin}) => {
	const classes = useStyles();

	return (
		<aside
			className={classes.root}
			style={{margin: disableMargin ? 0 : '20px 0', padding: disableMargin ? 0 : '10px'}}
		>
			<CircularProgress />
		</aside>
	);
};

export default Loader;
