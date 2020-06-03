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

import ReplyForm from './ReplyForm';
import UserAvatar from '@components/avatars/UserAvatar';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';
import {userLink} from '@utils/users';
import {IReply} from '@store/types';
import {useRedirect} from '@utils/hooks';
import Context from '@pages/Article/context';

type Props = {
	reply: IReply;
	handleLike: (commentId: string) => void;
	handleDislike: (commentId: string) => void;
};

const Reply: React.FC<Props> = ({reply, handleLike, handleDislike}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [replyForm, setReplyForm] = useState(false);

	const {auth, removeReply} = useContext(Context);

	const redirectTo = useRedirect();

	const userName = `${reply.user.firstName} ${reply.user.lastName}`.trim();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<div className='reply'>
			<Link underline='none' component={RouterLink} to={userLink(reply.user)} color='inherit'>
				<UserAvatar user={reply.user} small />
			</Link>

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
					<div className='assessment'>
						<ZoomTooltip title='Like'>
							<IconButton color='default' onClick={(): void => handleLike(reply._id)}>
								<ThumbUpIcon fontSize='small' />
							</IconButton>
						</ZoomTooltip>

						{Boolean(reply.likes) && (
							<Typography variant='body2' className='likes-number'>
								{reply.likes}
							</Typography>
						)}

						<ZoomTooltip title='Dislike'>
							<IconButton color='default' onClick={(): void => handleDislike(reply._id)}>
								<ThumbDownIcon fontSize='small' />
							</IconButton>
						</ZoomTooltip>
					</div>

					<Button
						size='small'
						onClick={(): void => {
							if (!auth.isAuth) {
								return redirectTo('/auth');
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
						<MenuItem>Edit</MenuItem>
						<MenuItem onClick={(): void => removeReply(reply._id)}>Remove</MenuItem>
					</div>
				) : (
					<MenuItem>Report</MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Reply;
