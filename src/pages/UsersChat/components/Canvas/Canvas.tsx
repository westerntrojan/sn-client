import React, {useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Loader from '@components/Loader';
import {RemoveMessageModal} from '@components/modals';
import Header from './Header';
import NewInfo from './NewInfo';
import Message from './Message';
import Form from './Form';
import AlterHeader from '@components/chats/AlterHeader';
import MyMessage from '@components/chats/MyMessage';
import {IMessage} from '@pages/UsersChat/types';

const useStyles = makeStyles({
	root: {
		position: 'relative',
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		marginBottom: 20,
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
		flex: 1,
	},
	messages: {
		padding: '0 20px',
		height: '100%',
		overflow: 'auto',
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

			<Divider />

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

			<Divider />

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
