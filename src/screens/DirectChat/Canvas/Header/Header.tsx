import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreVert from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import PointsLoader from './PointsLoader';
import Context from '@screens/DirectChat/context';

const useStyles = makeStyles(theme => ({
	root: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
	},
	leftSide: {
		display: 'flex',
		alignItems: 'center',
	},
	rightSide: {
		display: 'flex',
		alignItems: 'center',
	},
	arrowBack: {
		marginRight: 10,
	},
	activeUsers: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: 5,
	},
	avatar: {
		marginLeft: 10,
	},
	typing: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},

	[theme.breakpoints.down('xs')]: {
		avatar: {
			display: 'none',
		},
	},
}));

const Header: React.FC = () => {
	const classes = useStyles();

	const history = useHistory();

	const {typing} = useContext(Context);

	return (
		<div className={classes.root}>
			<div className={classes.leftSide}>
				<IconButton className={classes.arrowBack} onClick={() => history.goBack()}>
					<ArrowBackIcon />
				</IconButton>
			</div>
			<Fade in={typing}>
				<div className={classes.typing}>
					<Typography color='primary'>
						typing
						<PointsLoader />
					</Typography>
				</div>
			</Fade>
			<div className={classes.rightSide}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<IconButton>
					<MoreVert />
				</IconButton>

				<Skeleton variant='circle' width={40} height={40} />
			</div>
		</div>
	);
};

export default Header;
