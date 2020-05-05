import React, {useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Loader from '@components/Loader';
import {RemoveMessageModal} from '@components/modals';
import Header from './Header';
import Message from './Message';
import Form from './Form';
import AlterHeader from '@components/chats/AlterHeader';
import MyMessage from '@components/chats/MyMessage';
import ForNotAuth from '@components/ForNotAuth';
import {IMessage} from '@pages/Chat/types';

const useStyles = makeStyles({
	root: {
		position: 'relative',
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
	auth: {
		isAuth: boolean;
		user: {
			_id: string;
		};
	};
	removed: boolean;
	loading: boolean;
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({messages, auth, removed, loading, handleRemoveMessages}) => {
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

	const removeMessages = (): void => {
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

				{auth.user &&
					messages &&
					messages.map(message => {
						if (message.user._id === auth.user._id) {
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

				{!auth.user &&
					messages &&
					messages.map(message => <Message message={message} key={message._id} />)}

				<div ref={messagesEndRef} />
			</div>

			{auth.isAuth ? (
				<>
					<Divider />
					<Form />
				</>
			) : (
				<ForNotAuth text={'Only full users can using chat.'} />
			)}

			<RemoveMessageModal
				selectedMessages={selectedMessages.length}
				open={removeMessagesModal}
				action={removeMessages}
				closeModal={(): void => setRemoveMessagesModal(false)}
			/>
		</Paper>
	);
};

export default Canvas;
