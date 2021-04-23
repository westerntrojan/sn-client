import React, {useContext} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import UserAvatar from '@/components/common/avatars/UserAvatar';
import {IChat} from '@/screens/Direct/types';
import {relativeDate} from '@/utils/common';
import Context from '@/screens/Direct/context';

const useStyles = makeStyles({
	root: {
		wordWrap: 'break-word',
	},
	inline: {
		display: 'inline',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginRight: 10,
	},
	text: {
		color: grey[500],
		marginRight: 10,
	},
	lastMessage: {
		display: 'flex',
		alignItems: 'center',
	},
	lastMessageText: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',

		maxWidth: 600,
	},
});

type Props = {
	chat: IChat;
};

const ChatItem: React.FC<Props> = ({chat}) => {
	const classes = useStyles();

	const {handleRemoveModal} = useContext(Context);

	return (
		<>
			<ListItem
				button
				alignItems='flex-start'
				component={RouterLink}
				to={`/direct/${chat._id}`}
				className={classes.root}
			>
				<ListItemAvatar>
					<UserAvatar user={chat.user} />
				</ListItemAvatar>

				<ListItemText
					disableTypography
					primary={
						<div className={classes.title}>
							<Typography variant='subtitle1'>
								{`${chat.user.firstName} ${chat.user.lastName}`.trim()}
							</Typography>

							<Typography variant='caption'>
								{chat.lastMessage && relativeDate(chat.lastMessage.created)}
							</Typography>
						</div>
					}
					secondary={
						chat.lastMessage && (
							<Typography variant='body2' className={classes.lastMessageText}>
								{chat.lastMessage.text}
							</Typography>
						)
					}
				/>

				<ListItemSecondaryAction>
					<IconButton edge='end' onClick={() => handleRemoveModal(chat._id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			<Divider variant='inset' />
		</>
	);
};

export default ChatItem;
