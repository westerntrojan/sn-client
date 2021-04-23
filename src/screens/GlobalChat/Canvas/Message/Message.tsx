import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';

import UserAvatar from '@/components/common/avatars/UserAvatar';
import {IMessage} from '@/components/common/chats/types';
import TextMessage from './TextMessage';
import AudioMessage from './AudioMessage';
import GlobalChatContext from '@/screens/GlobalChat/GlobalChatContext';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '5px 10px',
		display: 'flex',
		alignItems: 'flex-end',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		'& .MuiCard-root': {
			width: 'fit-content',
			borderRadius: '5px',
			minWidth: '200px',
			maxWidth: '100%',
			backgroundColor: theme.palette.background.paper,
			'& .MuiCardContent-root': {
				padding: '5px 10px',
			},
			'& .MuiCardActions-root': {
				padding: '5px 10px',
			},
		},
	},
	avatar: {
		marginRight: 10,
	},
}));

type Props = {
	message: IMessage;
};

const Message: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	const [isFirstRender, setIsFirstRender] = useState(true);

	const {handleReadMessage} = useContext(GlobalChatContext);

	const handleVisibleChange = (isVisible: boolean) => {
		if (isVisible && !message.isRead && !isFirstRender) {
			handleReadMessage(message._id);
		}

		setIsFirstRender(false);
	};

	return (
		<VisibilitySensor onChange={handleVisibleChange} offset={{top: 150, bottom: 60}}>
			<div className={classNames('message', classes.root)}>
				<UserAvatar user={message.user} className={classes.avatar} link />

				{message.type === 'text' && <TextMessage message={message} />}

				{message.type === 'audio' && <AudioMessage message={message} />}
			</div>
		</VisibilitySensor>
	);
};

export default Message;
