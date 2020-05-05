import React, {useState, useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PointsLoader from '@components/PointsLoader';
import UserAvatar from '@components/avatars/UserAvatar';
import {userLink} from '@utils/users';
import Context, {IContext} from '@pages/UsersChat/context';

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

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const {typing, user, openClearHistoryModal}: IContext = useContext(Context);

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	const _handleClearMessageHistory = (): void => {
		closeMenu();

		openClearHistoryModal();
	};

	return (
		<div className={classes.root}>
			<div className={classes.leftSide}>
				<IconButton className={classes.arrowBack} onClick={(): void => history.goBack()}>
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
				<IconButton onClick={openMenu}>
					<MoreHorizIcon />
				</IconButton>

				<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
					<MenuItem onClick={_handleClearMessageHistory}>Clear message history</MenuItem>
				</Menu>

				{user ? (
					<Link underline='none' component={RouterLink} to={userLink(user)} color='inherit'>
						<UserAvatar user={user} className={classes.avatar} />
					</Link>
				) : (
					<Skeleton variant='circle' width={40} height={40} />
				)}
			</div>
		</div>
	);
};

export default Header;
