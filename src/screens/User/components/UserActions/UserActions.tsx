import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from 'react-redux';

import UserAvatar from './components/UserAvatar';
import {userLink} from '@utils/users';
import {IUser} from '@store/types';
import {useAuthModal} from '@utils/hooks';
import {subscribeToUser, unsubscribeFromUser} from '@store/auth/actions';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginRight: 20,
	},
	actions: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	button: {
		width: '100%',
	},
});

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
		user: IUser;
	};
	user: IUser;
	handleRemove: () => void;
};

const UserActions: React.FC<Props> = ({auth, user, handleRemove}) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const {openAuthModal} = useAuthModal();

	const dispatch = useDispatch();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	const handleSubscribe = (): void => {
		if (auth.user.subscriptions.includes(user._id)) {
			dispatch(unsubscribeFromUser(user._id));
		} else {
			dispatch(subscribeToUser(user._id));
		}
	};

	return (
		<div className={classNames('user-actions', classes.root)}>
			<UserAvatar auth={auth} user={user} />
			{!auth.isAuth && (
				<Button
					variant='contained'
					color='primary'
					fullWidth
					className='button'
					onClick={openAuthModal}
				>
					Send message
				</Button>
			)}
			{auth.isAuth && auth.user._id !== user._id && (
				<Link
					underline='none'
					component={RouterLink}
					to={`/users-chat/${user._id}`}
					className={classes.button}
				>
					<Button variant='contained' color='primary' fullWidth className='button'>
						Send message
					</Button>
				</Link>
			)}

			{auth.isAuth && auth.user._id !== user._id && (
				<Button
					variant='contained'
					color={auth.user.subscriptions.includes(user._id) ? 'secondary' : 'primary'}
					fullWidth
					style={{margin: '10px 0'}}
					onClick={handleSubscribe}
				>
					{auth.user.subscriptions.includes(user._id) ? 'Subscribed' : 'Subscribe'}
				</Button>
			)}

			{(auth.user && auth.user._id === user._id) || auth.isAdmin ? (
				<div className={classes.actions}>
					<Link
						underline='none'
						component={RouterLink}
						to={`${userLink(user)}/edit`}
						className={classes.button}
					>
						<Button variant='contained' color='primary' fullWidth className='button'>
							Edit
						</Button>
					</Link>

					<IconButton color='primary' onClick={openMenu}>
						<MoreVertIcon />
					</IconButton>

					<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
						<MenuItem
							onClick={(): void => {
								closeMenu();

								handleRemove();
							}}
						>
							<ListItemIcon>
								<DeleteIcon />
							</ListItemIcon>
							<ListItemText primary='Remove' />
						</MenuItem>
					</Menu>
				</div>
			) : null}
		</div>
	);
};

export default UserActions;
