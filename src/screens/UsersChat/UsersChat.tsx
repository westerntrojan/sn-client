import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';

import './UsersChat.scss';
import Canvas from './components/Canvas';
import callApi from '@utils/callApi';
import {RemoveModal} from '@components/common/modals';
import {RootState} from '@store/types';
import {IMessage} from '@components/common/chats/types';
import {IFetchData, IClearHistoryData} from './types';
import {IUser} from '@store/types';
import Context from './context';

let socket: SocketIOClient.Socket;

const UsersChat: React.FC = () => {
	const {userId} = useParams();

	const [chatId, setChatId] = useState('');
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [removed, setRemoved] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser | null>(null);
	const [isNew, setIsNew] = useState(false);
	const [typing, setTyping] = useState(false);
	const [clearHistoryModal, setClearHistoryModal] = useState(false);

	const authUser = useSelector((state: RootState) => state.auth.user, shallowEqual);

	const {enqueueSnackbar} = useSnackbar();

	const _handleError = useCallback((): void => {
		enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	}, [enqueueSnackbar]);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/users`);
		socket.on('error', _handleError);
		socket.on('user_error', _handleError);

		socket.on('connect', () => {
			socket.emit('user_connect', {from: authUser._id, to: userId});
		});

		socket.on('chat_not_found', () => {
			setIsNew(true);
			setLoading(false);
		});
	}, [userId, authUser._id, _handleError]);

	const socketListeners = useCallback(() => {
		socket.on('typing', () => setTyping(true));
		socket.on('typing_end', () => setTyping(false));

		socket.on(
			'pre_messages',
			({preMessages, chatId}: {preMessages: IMessage[]; chatId: string}) => {
				setLoading(false);
				setChatId(chatId);
				setMessages(!loading ? messages : preMessages);
			},
		);
		socket.on('new_message', (message: IMessage) => {
			if (message.user._id === authUser._id) {
				setRemoved(false);
			} else {
				setRemoved(true);
			}

			setMessages(messages.concat(message));
			setIsNew(false);
		});
		socket.on('remove_messages', (removedMessages: string[]) => {
			setRemoved(true);

			setMessages(
				messages.filter(message => {
					if (removedMessages.includes(message._id)) {
						return null;
					}

					return message;
				}),
			);
		});
	}, [messages, loading, authUser._id]);

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			const data: IFetchData = await callApi.get(`/users/${userId}`);

			setUser(data.user);
		};
		fetchUser();

		socketInit();
		socketListeners();

		return function cleanup(): void {
			socket.close();
		};
	}, [userId, socketInit, socketListeners]);

	const openClearHistoryModal = (): void => {
		setClearHistoryModal(true);
	};

	const handleTyping = (): void => {
		socket.emit('typing');
	};

	const handleTypingEnd = (): void => {
		socket.emit('typing_end');
	};

	const handleRemoveMessages = (messages: string[]): void => {
		socket.emit('remove_messages', messages);
	};

	const handleSubmitMessage = (text: string): void => {
		if (isNew) {
			socket.emit('first_message', {from: authUser._id, text, to: userId});
		} else {
			socket.emit('new_message', {user: authUser._id, text});
		}
	};

	const handleClearHistory = async (): Promise<void> => {
		const data: IClearHistoryData = await callApi.delete(`/chats/messages/${chatId}`);

		if (data.success) {
			setMessages([]);

			setClearHistoryModal(false);
		}
	};

	return (
		<section className='user-chat'>
			<Helmet>
				<title>Messages / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{user && (
				<>
					<Context.Provider
						value={{
							typing,
							user,
							openClearHistoryModal,
							handleSubmitMessage,
							handleTyping,
							handleTypingEnd,
						}}
					>
						<Canvas
							messages={messages}
							authUser={authUser}
							loading={loading}
							removed={removed}
							isNew={isNew}
							handleRemoveMessages={handleRemoveMessages}
						/>
					</Context.Provider>

					<RemoveModal
						open={clearHistoryModal}
						text={`You definitely want to remove the correspondence with ${user.firstName} ${user.lastName}?`}
						action={handleClearHistory}
						closeModal={(): void => setClearHistoryModal(false)}
					/>
				</>
			)}
		</section>
	);
};

export default UsersChat;
