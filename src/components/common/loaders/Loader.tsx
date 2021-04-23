import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

type Props = CircularProgressProps & {disableMargin?: boolean};

const Loader: React.FC<Props> = ({disableMargin, ...props}) => {
	const classes = useStyles();

	return (
		<aside
			className={classes.root}
			style={{margin: disableMargin ? 0 : '20px 0', padding: disableMargin ? 0 : '10px'}}
		>
			<CircularProgress {...props} />
		</aside>
	);
};

export default Loader;
