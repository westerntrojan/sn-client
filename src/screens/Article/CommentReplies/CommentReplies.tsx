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
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import UserAvatar from '@/components/common/avatars/UserAvatar';
import {userLink} from '@/utils/users';
import {IComment} from '@/store/types';
import Context from '@/screens/Article/context';
import {useAuthModal} from '@/utils/hooks';

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

	const {openAuthModal} = useAuthModal();

	const repliesCount = comment.replies.length;

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};

	const openReplyForm = () => {
		if (!auth.isAuth) {
			return openAuthModal();
		}

		setReplyForm(true);
	};

	return (
		<div className='comment-replies'>
			<div className='comment'>
				<UserAvatar user={comment.user} link />

				<CardContent className='content'>
					<div className='info'>
						<Typography className='username' variant='body2'>
							<Link
								underline='none'
								component={RouterLink}
								to={userLink(comment.user)}
								color='inherit'
							>
								{`${comment.user.firstName} ${comment.user.lastName}`.trim()}
							</Link>
						</Typography>

						<Typography variant='body2' className='date'>
							{moment(comment.created).fromNow()}
						</Typography>
					</div>

					<Typography className='text'>{comment.text}</Typography>

					<div className='actions'>
						<div className='rating'>
							<IconButton color='default' onClick={() => addLike(comment._id)}>
								<ThumbUpIcon />
							</IconButton>

							{Boolean(comment.likes) && (
								<Typography variant='body2' style={{marginRight: 10}}>
									{comment.likes}
								</Typography>
							)}

							<IconButton color='default' onClick={() => addDislike(comment._id)}>
								<ThumbDownIcon />
							</IconButton>
						</div>

						<Button size='small' onClick={openReplyForm}>
							Reply
						</Button>
					</div>

					{replyForm && (
						<ReplyForm
							parentId={comment._id}
							comment={comment}
							handleClose={() => setReplyForm(false)}
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

							<MenuItem onClick={() => handleRemove(comment._id)}>
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
							onClick={() => setShowReplies(!showReplies)}
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
