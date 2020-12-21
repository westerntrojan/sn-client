import React, {useState, useContext} from 'react';
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
import {useHistory} from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserAvatar from './UserAvatar';
import {userLink} from '@utils/users';
import {useAuthModal} from '@utils/hooks';
import Context from '@screens/User/context';
import callApi from '@utils/callApi';

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
	buttonWrapper: {
		width: '100%',
		position: 'relative',
	},
	button: {
		width: '100%',
	},
	buttonLoader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
});

type Props = {
	handleRemoveUser: () => void;
	handleFollowToUser: () => void;
};

const UserActions: React.FC<Props> = ({handleRemoveUser, handleFollowToUser}) => {
	const classes = useStyles();

	const {auth, user} = useContext(Context);

	const [loadingChatId, setLoadingChatId] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const {openAuthModal} = useAuthModal();

	const history = useHistory();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const handleSendMessage = async () => {
		setLoadingChatId(true);

		const data = await callApi.get(`/chats/id/${auth.user._id}/${user._id}`);

		history.push(`/messages/${data.chatId}`);
	};

	return (
		<div className={classNames('user-actions', classes.root)}>
			<UserAvatar />
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
				<div className={classes.buttonWrapper}>
					<Button
						variant='contained'
						color='primary'
						className='button'
						disabled={loadingChatId}
						onClick={handleSendMessage}
						fullWidth
					>
						Send message
					</Button>

					{loadingChatId && <CircularProgress size={24} className={classes.buttonLoader} />}
				</div>
			)}

			{auth.isAuth && auth.user._id !== user._id && (
				<Button
					variant='contained'
					color={auth.user.following.includes(user._id) ? 'secondary' : 'primary'}
					fullWidth
					style={{margin: '10px 0'}}
					onClick={handleFollowToUser}
				>
					{auth.user.following.includes(user._id) ? 'Following' : 'Follow'}
				</Button>
			)}

			{(auth.isAuth && auth.user._id === user._id) || auth.isAdmin ? (
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
							onClick={() => {
								closeMenu();

								handleRemoveUser();
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
