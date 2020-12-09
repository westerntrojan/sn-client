import React, {useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector, shallowEqual} from 'react-redux';
import {Alert} from '@material-ui/lab';

import Loader from '@components/common/loaders/Loader';
import {RemoveModal} from '@components/common/modals';
import MyMessage from '@components/common/chats/MyMessage';
import {IMessage} from '@components/common/chats/types';
import AlterHeader from './AlterHeader';
import Header from './Header';
import Message from './Message';
import Form from './Form';
import {RootState} from '@store/types';

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
	error: boolean;
	loading: boolean;
	messages: IMessage[];
	scrollDown: boolean;
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({loading, error, messages, scrollDown, handleRemoveMessages}) => {
	const classes = useStyles();

	const [alterHeader, setAlterHeader] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
	const [removeMessagesModal, setRemoveMessagesModal] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	useEffect(() => {
		if (scrollDown || error) {
			if (messagesContainerRef.current) {
				messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
			}
		}
	}, [messages, scrollDown, error]);

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
					handleRemoveMessages={openRemoveMessagesModal}
				/>
			) : (
				<Header />
			)}

			<Divider />

			<div className={classes.messages} ref={messagesContainerRef}>
				{loading && <Loader />}

				{messages.map(message => {
					if (message.user._id === auth.user._id) {
						return (
							<MyMessage
								key={message._id}
								message={message}
								selectMessage={selectMessage}
								alterHeader={alterHeader}
							/>
						);
					}

					return <Message key={message._id} message={message} />;
				})}

				{error && (
					<div style={{padding: 40}}>
						<Alert severity='error' variant='outlined'>
							Something went wrong. Try reload page
						</Alert>
					</div>
				)}
			</div>

			<Divider />

			<Form />

			<RemoveModal
				open={removeMessagesModal}
				action={removeMessages}
				text={
					selectedMessages.length > 1
						? `Do you want to remove ${selectedMessages.length} messages ?`
						: 'Do you want to remove this message ?'
				}
				closeModal={(): void => setRemoveMessagesModal(false)}
			/>
		</Paper>
	);
};

export default Canvas;
