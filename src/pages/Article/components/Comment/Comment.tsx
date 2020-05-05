import React, {useState} from 'react';
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './style.scss';
import UserAvatar from '@components/avatars/UserAvatar';
import {userLink} from '@utils/users';
import {IComment} from '@store/types';

type Props = {
	comment: IComment;
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
		user: {
			_id: string;
		};
	};
	handleLike: (commentId: string) => void;
	handleDislike: (commentId: string) => void;
	handleRemove: (commentId: string) => void;
};

const Comment: React.FC<Props> = ({comment, auth, handleLike, handleDislike, handleRemove}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<div className={classNames('comment')}>
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
							{`${comment.user.firstName} ${comment.user.lastName}`.trim()}
						</Link>
					</Typography>

					<Typography variant='body2' className='date'>
						{moment(comment.created).fromNow()}
					</Typography>
				</div>

				<Typography className='text'>{comment.text}</Typography>

				<div className='actions'>
					<div className='assessment'>
						<IconButton color='default' onClick={(): void => handleLike(comment._id)}>
							<ThumbUpIcon fontSize='small' />
						</IconButton>

						{Boolean(comment.likes) && (
							<Typography variant='body2' className='likes-number'>
								{comment.likes}
							</Typography>
						)}

						<IconButton color='default' onClick={(): void => handleDislike(comment._id)}>
							<ThumbDownIcon fontSize='small' />
						</IconButton>
					</div>

					<Button size='small'>Reply</Button>
				</div>
			</CardContent>

			<IconButton className='action-icon' onClick={openMenu}>
				<MoreVertIcon />
			</IconButton>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
				{(auth.user && auth.user._id === comment.user._id) || auth.isAdmin ? (
					<div>
						<MenuItem onClick={(): void => console.log('Edit')}>Edit</MenuItem>
						<MenuItem onClick={(): void => handleRemove(comment._id)}>Remove</MenuItem>
					</div>
				) : (
					<MenuItem onClick={(): void => console.log('Report')}>Report</MenuItem>
				)}
			</Menu>
		</div>
	);
};

export default Comment;
