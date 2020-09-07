import React, {useState, useContext} from 'react';
import _ from 'lodash';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FlagIcon from '@material-ui/icons/Flag';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import './CommentReplies.scss';
import ReplyForm from './components/ReplyForm';
import Reply from './components/Reply';
import UserAvatar from '@components/common/avatars/UserAvatar';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import {userLink} from '@utils/users';
import {IComment} from '@store/types';
import useRedirect from '@utils/hooks/useRedirect';
import Context from '@screens/Article/context';

type Props = {
	comment: IComment;
	addLike: (commentId: string) => void;
	addDislike: (commentId: string) => void;
	handleRemove: (commentId: string) => void;
};

const CommentReplies: React.FC<Props> = ({comment, addLike, addDislike, handleRemove}) => {
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
		<div className='comment-replies'>
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
						<div className='rating'>
							<ZoomTooltip title='Like'>
								<IconButton color='default' onClick={(): void => addLike(comment._id)}>
									<ThumbUpIcon />
								</IconButton>
							</ZoomTooltip>

							{Boolean(comment.likes) && (
								<Typography variant='body2' style={{marginRight: 10}}>
									{comment.likes}
								</Typography>
							)}

							<ZoomTooltip title='Dislike'>
								<IconButton color='default' onClick={(): void => addDislike(comment._id)}>
									<ThumbDownIcon />
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
				</CardContent>

				<IconButton className='action-icon' onClick={openMenu}>
					<MoreVertIcon />
				</IconButton>

				<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
					{(auth.user && auth.user._id === comment.user._id) || auth.isAdmin ? (
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

							<MenuItem onClick={(): void => handleRemove(comment._id)}>
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

			<div className='replies'>
				{!_.isEmpty(comment.replies) && (
					<>
						<Button
							size='small'
							startIcon={showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							onClick={(): void => setShowReplies(!showReplies)}
						>
							{showReplies
								? `Hide ${repliesCount > 1 ? `${repliesCount} replies` : 'reply'}`
								: `View ${repliesCount > 1 ? `${repliesCount} replies` : 'reply'}`}
						</Button>

						{showReplies &&
							comment.replies.map(reply => (
								<Reply key={reply._id} reply={reply} addLike={addLike} addDislike={addDislike} />
							))}
					</>
				)}
			</div>
		</div>
	);
};

export default CommentReplies;
