import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import {userAvatar} from '@utils/users';
import {IChat} from '@pages/Messages/types';
import {relativeDate} from '@utils/app';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

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
					<Avatar
						src={chat.user.avatar.images[0]}
						style={{backgroundColor: chat.user.avatar.color}}
						className='avatar'
					>
						{userAvatar(chat.user)}
					</Avatar>
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
						chat.lastMessage ? (
							<ResponsiveEllipsis
								text={chat.lastMessage.text}
								maxLine='1'
								ellipsis='...'
								trimRight
								basedOn='letters'
								component='p'
								className={classes.text}
							/>
						) : null
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
