import React, {useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import Loader from '@components/common/loaders/Loader';
import {RemoveMessageModal} from '@components/common/modals';
import AlterHeader from '@components/common/chats/AlterHeader';
import MyMessage from '@components/common/chats/MyMessage';
import {IMessage} from '@components/common/chats/types';
import Header from './Header';
import NewInfo from './NewInfo';
import Message from './Message';
import Form from './Form';

const useStyles = makeStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	messages: {
		overflow: 'auto',
		flex: 1,
		position: 'relative',
	},
});

type Props = {
	messages: IMessage[];
	authUser: {
		_id: string;
	};
	removed: boolean;
	isNew: boolean;
	loading: boolean;
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({
	messages,
	authUser,
	removed,
	isNew,
	loading,
	handleRemoveMessages,
}) => {
	const classes = useStyles();

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [alterHeader, setAlterHeader] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
	const [removeMessagesModal, setRemoveMessagesModal] = useState(false);

	useEffect(() => {
		if (!removed && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({block: 'end'});
		}
	}, [messages, removed]);

	const openRemoveMessagesModal = (): void => {
		setRemoveMessagesModal(true);
	};

	const selectMessage = (_id: string): void => {
		if (!alterHeader) {
			setAlterHeader(true);
		}

		if (selectedMessages.includes(_id)) {
			setSelectedMessages(selectedMessages.filter(message => message !== _id));
		} else {
			setSelectedMessages(selectedMessages.concat(_id));
		}
	};

	const closeAlterHeader = (): void => {
		setAlterHeader(false);
		setSelectedMessages([]);
	};

	const _handleRemoveMessages = (): void => {
		handleRemoveMessages(selectedMessages);
		setSelectedMessages([]);
		closeAlterHeader();
		setRemoveMessagesModal(false);
	};

	return (
		<Paper className={classes.root}>
			{alterHeader && selectedMessages.length ? (
				<AlterHeader
					selectedMessages={selectedMessages.length}
					closeAlterHeader={closeAlterHeader}
					openRemoveMessagesModal={openRemoveMessagesModal}
				/>
			) : (
				<Header />
			)}

			<div className={classes.messages}>
				{loading && <Loader />}

				{isNew && !messages && <NewInfo />}

				{messages &&
					messages.map(message => {
						if (message.user._id === authUser._id) {
							return (
								<MyMessage
									message={message}
									key={message._id}
									selectMessage={selectMessage}
									alterHeader={alterHeader}
								/>
							);
						}

						return <Message message={message} key={message._id} />;
					})}

				<div ref={messagesEndRef} />
			</div>

			<Form />

			<RemoveMessageModal
				selectedMessages={selectedMessages.length}
				open={removeMessagesModal}
				action={_handleRemoveMessages}
				closeModal={(): void => setRemoveMessagesModal(false)}
			/>
		</Paper>
	);
};

export default Canvas;
