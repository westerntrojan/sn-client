import React, {useState, useContext} from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlagIcon from '@material-ui/icons/Flag';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ReplyForm from './ReplyForm';
import UserAvatar from '@components/common/avatars/UserAvatar';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {userLink} from '@utils/users';
import {IReply} from '@store/types';
import {useAuthModal} from '@utils/hooks';
import Context from '@screens/Article/context';

type Props = {
	reply: IReply;
	addLike: (commentId: string) => void;
	addDislike: (commentId: string) => void;
};

const Reply: React.FC<Props> = ({reply, addLike, addDislike}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [replyForm, setReplyForm] = useState(false);

	const {auth, removeReply} = useContext(Context);

	const {openAuthModal} = useAuthModal();

	const userName = `${reply.user.firstName} ${reply.user.lastName}`.trim();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<div className='reply'>
			<UserAvatar user={reply.user} small link />

			<div className='content'>
				<div className='info'>
					<Typography className='username' variant='subtitle2'>
						<Link underline='none' component={RouterLink} to={userLink(reply.user)} color='inherit'>
							{userName}
						</Link>
					</Typography>

					<Typography variant='body2' className='date'>
						{moment(reply.created).fromNow()}
					</Typography>
				</div>

				<Typography className='text'>{reply.text}</Typography>

				<div className='actions'>
					<div className='rating'>
						<ZoomTooltip title='Like'>
							<IconButton color='default' onClick={(): void => addLike(reply._id)}>
								<ThumbUpIcon />
							</IconButton>
						</ZoomTooltip>

						{Boolean(reply.likes) && (
							<Typography variant='body2' className='likes-number'>
								{reply.likes}
							</Typography>
						)}

						<ZoomTooltip title='Dislike'>
							<IconButton color='default' onClick={(): void => addDislike(reply._id)}>
								<ThumbDownIcon />
							</IconButton>
						</ZoomTooltip>
					</div>

					<Button
						size='small'
						onClick={(): void => {
							if (!auth.isAuth) {
								return openAuthModal();
							}

							setReplyForm(true);
						}}
					>
						Reply
					</Button>
				</div>

				{replyForm && (
					<ReplyForm
						parentId={reply.parentId}
						comment={reply}
						handleClose={(): void => setReplyForm(false)}
					/>
				)}
			</div>

			<IconButton className='action-icon' onClick={openMenu}>
				<MoreVertIcon />
			</IconButton>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
				{(auth.user && auth.user._id === reply.user._id) || auth.isAdmin ? (
					<div>
						<MenuItem onClick={closeMenu}>
							<ListItemIcon>
								<FlagIcon />
							</ListItemIcon>
							<ListItemText primary='Report' />
						</MenuItem>

						<MenuItem onClick={closeMenu}>
							<ListItemIcon>
								<EditIcon />
							</ListItemIcon>
							<ListItemText primary='Edit' />
						</MenuItem>

						<MenuItem onClick={(): void => removeReply(reply._id)}>
							<ListItemIcon>
								<DeleteIcon />
							</ListItemIcon>
							<ListItemText primary='Remove' />
						</MenuItem>
					</div>
				) : (
					<MenuItem onClick={closeMenu}>
						<ListItemIcon>
							<FlagIcon />
						</ListItemIcon>
						<ListItemText primary='Report' />
					</MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Reply;
