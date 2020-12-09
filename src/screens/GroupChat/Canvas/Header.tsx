import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Skeleton from '@material-ui/lab/Skeleton';
import {useHistory} from 'react-router';

const useStyles = makeStyles({
	root: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
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
});

const Header: React.FC = () => {
	const classes = useStyles();

	const history = useHistory();

	return (
		<div className={classes.root}>
			<div className={classes.leftSide}>
				<IconButton className={classes.arrowBack} onClick={() => history.goBack()}>
					<ArrowBackIcon />
				</IconButton>

				<div>
					<Skeleton width={100} height={30} />
					<Skeleton width={70} height={20} />
				</div>
			</div>

			<div className={classes.rightSide}>
				<IconButton>
					<InfoIcon />
				</IconButton>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<IconButton>
					<MoreVertIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Header;
