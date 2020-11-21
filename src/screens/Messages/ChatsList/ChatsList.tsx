import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

import ChatItem from './ChatItem';
import {IChat} from '@screens/Messages/types';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	notInfoBlock: {
		textAlign: 'center',
		marginTop: 20,
	},
}));

type Props = {
	chats: IChat[];
	query: string;
};

const ChatsList: React.FC<Props> = ({chats, query}) => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{_.isEmpty(chats) ? (
				<div className={classes.notInfoBlock}>
					<Typography>Chat list is empty</Typography>
				</div>
			) : (
				chats.map(chat => {
					if (
						chat.user.firstName
							.trim()
							.toLowerCase()
							.includes(query.trim().toLowerCase()) ||
						chat.user.lastName
							.trim()
							.toLowerCase()
							.includes(query.trim().toLowerCase()) ||
						chat.user.username
							.trim()
							.toLowerCase()
							.includes(query.trim().toLowerCase())
					) {
						return <ChatItem key={chat._id} chat={chat} />;
					}

					return null;
				})
			)}
		</List>
	);
};

export default ChatsList;
