import React, {useEffect, useCallback, useReducer} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';
import callApi from '@utils/callApi';

import './style.scss';
import Canvas from './components/Canvas';
import {RootState} from '@store/types';
import {IMessage} from '@components/chat/types';
import {ISendingMessage} from './types';
import Context from './context';
import reducer, {initialState} from './reducer';

let socket: SocketIOClient.Socket;

const Chat: React.FC = () => {
	const [{activeUsers, messages, loading, removed}, dispatch] = useReducer(reducer, initialState);

	const {enqueueSnackbar} = useSnackbar();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const _handleError = useCallback((): void => {
		enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	}, [enqueueSnackbar]);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/main`);

		socket.on('error', _handleError);
		socket.on('user_error', _handleError);
	}, [_handleError]);

	const socketListeners = useCallback(() => {
		socket.on('connect', () => {
			socket.emit('user_connect');

			socket.on('active_users', (data: {count: number}) => {
				dispatch({
					type: 'ACTIVE_USERS',
					payload: {
						count: data.count,
					},
				});
			});

			socket.on('pre_messages', (data: {preMessages: IMessage[]}) => {
				dispatch({
					type: 'PRE_MESSAGES',
					payload: {
						preMessages: data.preMessages,
					},
				});
			});

			socket.on('new_message', (data: {newMessage: IMessage}) => {
				if (data.newMessage.user._id === auth.user._id) {
					dispatch({
						type: 'NEW_MESSAGE_FROM_ME',
						payload: {
							newMessage: data.newMessage,
						},
					});
				} else {
					dispatch({
						type: 'NEW_MESSAGE',
						payload: {
							newMessage: data.newMessage,
						},
					});
				}
			});

			socket.on('load_more', (data: {messages: IMessage[]; end: boolean}) => {
				dispatch({
					type: 'LOAD_MORE',
					payload: {
						messages: data.messages,
						end: data.end,
					},
				});
			});

			socket.on('remove_messages', (data: {removedMessages: string[]}) => {
				dispatch({
					type: 'REMOVE_MESSAGES',
					payload: {
						removedMessages: data.removedMessages,
					},
				});
			});
		});
	}, [auth]);

	useEffect(() => {
		socketInit();
		socketListeners();

		return function cleanup(): void {
			socket.close();
		};
	}, [socketInit, socketListeners]);

	const loadMore = (): void => {
		if (!messages.end) {
			socket.emit('load_more', {skip: messages.all.length});
		}
	};

	const handleRemoveMessages = (removedMessages: string[]): void => {
		socket.emit('remove_messages', {removedMessages});
	};

	const handleSubmitMessage = async (newMessage: ISendingMessage): Promise<void> => {
		const user = auth.user._id;
		const {type, text, image, caption} = newMessage;

		if (type === 'text') {
			socket.emit('new_message', {
				newMessage: {
					user,
					type,
					text,
				},
			});
		} else {
			if (image) {
				const formData = new FormData();
				formData.append('userId', auth.user._id);
				formData.append('image', image);

				const data = await callApi.post('/chats/image', formData);

				if (data.success) {
					socket.emit('new_message', {
						newMessage: {
							user,
							type,
							text,
							image: {
								url: data.image,
								caption,
							},
						},
					});
				}
			}
		}
	};

	return (
		<section className='chat'>
			<Helmet>
				<title>Chat / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Context.Provider value={{activeUsers, handleSubmitMessage}}>
				<Canvas
					messages={messages.all}
					auth={auth}
					loading={loading}
					removed={removed}
					loadMore={loadMore}
					handleRemoveMessages={handleRemoveMessages}
				/>
			</Context.Provider>
		</section>
	);
};

export default Chat;
