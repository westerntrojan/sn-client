import React, {useState, useContext} from 'react';
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
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
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';

import './style.scss';
import ReplyForm from './components/ReplyForm';
import Reply from './components/Reply';
import UserAvatar from '@components/avatars/UserAvatar';
import ZoomTooltip from '@components/tooltips/ZoomTooltip';
import {userLink} from '@utils/users';
import {IComment} from '@store/types';
import {useRedirect} from '@utils/hooks';
import Context from '@pages/Article/context';

type Props = {
	comment: IComment;
	handleLike: (commentId: string) => void;
	handleDislike: (commentId: string) => void;
	handleRemove: (commentId: string) => void;
};

const Comment: React.FC<Props> = ({comment, handleLike, handleDislike, handleRemove}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [replyForm, setReplyForm] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const {auth} = useContext(Context);

	const redirectTo = useRedirect();

	const repliesCount = comment.replies.length;

	const userName = `${comment.user.firstName} ${comment.user.lastName}`.trim();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<div className='comment'>
			<Link underline='none' component={RouterLink} to={userLink(comment.user)} color='inherit'>
				<UserAvatar user={comment.user} />
			</Link>

			<CardContent className='content'>
				<div className='info'>
					<Typography className='username' variant='subtitle2'>
						<Link
							underline='none'
							component={RouterLink}
							to={userLink(comment.user)}
							color='inherit'
						>
							{userName}
						</Link>
					</Typography>

					<Typography variant='body2' className='date'>
						{moment(comment.created).fromNow()}
					</Typography>
				</div>

				<Typography className='text'>{comment.text}</Typography>

				<div className='actions'>
					<div className='assessment'>
						<ZoomTooltip title='Like'>
							<IconButton color='default' onClick={(): void => handleLike(comment._id)}>
								<ThumbUpIcon fontSize='small' />
							</IconButton>
						</ZoomTooltip>

						{Boolean(comment.likes) && (
							<Typography variant='body2' className='likes-number'>
								{comment.likes}
							</Typography>
						)}

						<ZoomTooltip title='Dislike'>
							<IconButton color='default' onClick={(): void => handleDislike(comment._id)}>
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
						parentId={comment._id}
						comment={comment}
						handleClose={(): void => setReplyForm(false)}
					/>
				)}

				{!_.isEmpty(comment.replies) && (
					<>
						<Button
							size='small'
							style={{marginBottom: 10}}
							startIcon={showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							onClick={(): void => setShowReplies(!showReplies)}
						>
							{showReplies
								? `Hide ${repliesCount > 1 ? `${repliesCount} replies` : 'reply'}`
								: `View ${repliesCount > 1 ? `${repliesCount} replies` : 'reply'}`}
						</Button>

						{showReplies && (
							<div className='replies'>
								{comment.replies.map(reply => (
									<Reply
										key={reply._id}
										reply={reply}
										handleLike={handleLike}
										handleDislike={handleDislike}
									/>
								))}
							</div>
						)}
					</>
				)}
			</CardContent>

			<IconButton className='action-icon' onClick={openMenu}>
				<MoreVertIcon />
			</IconButton>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
				{(auth.user && auth.user._id === comment.user._id) || auth.isAdmin ? (
					<div>
						<MenuItem>Edit</MenuItem>
						<MenuItem onClick={(): void => handleRemove(comment._id)}>Remove</MenuItem>
					</div>
				) : (
					<MenuItem>Report</MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Comment;
