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
	endMessages: boolean;
	scrollDown: boolean;
	handleLoadMore: () => void;
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({
	loading,
	error,
	messages,
	endMessages,
	scrollDown,
	handleLoadMore,
	handleRemoveMessages,
}) => {
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

	const openRemoveMessagesModal = () => {
		setRemoveMessagesModal(true);
	};

	const selectMessage = (_id: string) => {
		if (!alterHeader) {
			setAlterHeader(true);
		}

		if (selectedMessages.includes(_id)) {
			setSelectedMessages(selectedMessages.filter(message => message !== _id));
		} else {
			setSelectedMessages(selectedMessages.concat(_id));
		}
	};

	const closeAlterHeader = () => {
		setAlterHeader(false);
		setSelectedMessages([]);
	};

	const removeMessages = () => {
		handleRemoveMessages(selectedMessages);
		setSelectedMessages([]);
		closeAlterHeader();
		setRemoveMessagesModal(false);
	};

	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		const scrollTop = Math.trunc(e.currentTarget.scrollTop);

		if (scrollTop <= 300 && !endMessages) {
			handleLoadMore();
		}
	};

	const showMessageDate = (message: IMessage, prevMessage: IMessage | null, isFirst: boolean) => {
		if (isFirst) {
			return true;
		}

		const date = new Date(message.created);
		const prevDate = prevMessage ? new Date(prevMessage.created) : date;

		if (
			date.getFullYear() !== prevDate.getFullYear() ||
			date.getMonth() !== prevDate.getMonth() ||
			date.getDate() !== prevDate.getDate()
		) {
			return true;
		}

		return false;
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

			<div className={classes.messages} ref={messagesContainerRef} onScroll={handleScroll}>
				{loading && <Loader />}

				{messages.map((message, i) => {
					const prevMessage = i > 0 ? messages[i - 1] : null;
					const showDate = showMessageDate(message, prevMessage, i === 0);

					if (message.user._id === auth.user._id) {
						return (
							<MyMessage
								key={message._id}
								message={message}
								selectMessage={selectMessage}
								alterHeader={alterHeader}
								showDate={showDate}
							/>
						);
					}

					return <Message key={message._id} message={message} showDate={showDate} />;
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
				closeModal={() => setRemoveMessagesModal(false)}
			/>
		</Paper>
	);
};

export default Canvas;
