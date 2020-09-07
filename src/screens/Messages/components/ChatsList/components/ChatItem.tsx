import React from 'react';
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

import UserAvatar from '@components/common/avatars/UserAvatar';
import {IChat} from '@screens/Messages/types';
import {relativeDate} from '@utils/common';

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
	date: {
		fontSize: 14,
	},
	text: {
		fontSize: 14,
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
	},
});

type Props = {
	chat: IChat;
	openRemoveChatModal: (chatId: string) => void;
};

const ChatItem: React.FC<Props> = ({chat, openRemoveChatModal}) => {
	const classes = useStyles();

	return (
		<>
			<ListItem
				button
				alignItems='flex-start'
				component={RouterLink}
				to={`/users-chat/${chat.user._id}`}
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

							<Typography className={classes.date}>
								{chat.lastMessage && relativeDate(chat.lastMessage.created)}
							</Typography>
						</div>
					}
					secondary={
						<Typography className={classes.lastMessageText} variant='body2'>
							{chat.lastMessage.text}
						</Typography>
					}
				/>

				<ListItemSecondaryAction>
					<IconButton edge='end' onClick={(): void => openRemoveChatModal(chat._id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			<Divider variant='inset' />
		</>
	);
};

export default ChatItem;
