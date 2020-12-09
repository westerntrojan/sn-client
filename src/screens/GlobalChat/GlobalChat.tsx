import React, {useEffect, useCallback, useReducer} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

import './GlobalChat.scss';
import Canvas from './Canvas';
import {RootState} from '@store/types';
import {IMessage, IMessageInputs} from '@components/common/chats/types';
import GlobalChatContext from './GlobalChatContext';
import reducer, {initialState} from './reducer';
import * as types from './reducer/types';

let socket: SocketIOClient.Socket;

const GlobalChat: React.FC = () => {
	const [{activeUsers, messages, loading, scrollDown}, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const {enqueueSnackbar} = useSnackbar();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const _handleError = useCallback(
		(e: Error): void => {
			if (e.message === 'xhr poll error') {
				return;
			}

			enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
		},
		[enqueueSnackbar],
	);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/global`);

		socket.on('error', _handleError);
		socket.on('user_error', _handleError);
	}, [_handleError]);

	const socketListeners = useCallback(() => {
		socket.on('connect', () => {
			socket.emit('user_connect');

			socket.on('active_users', (data: {count: number}) => {
				dispatch({
					type: types.ACTIVE_USERS,
					payload: {
						count: data.count,
					},
				});
			});

			socket.on('pre_messages', (data: {messages: IMessage[]}) => {
				dispatch({
					type: types.PRE_MESSAGES,
					payload: {
						messages: data.messages,
					},
				});
			});

			socket.on('new_message', (data: {message: IMessage}) => {
				if (data.message.user._id === auth.user._id) {
					dispatch({
						type: types.NEW_MESSAGE_FROM_ME,
						payload: {
							message: data.message,
						},
					});
				} else {
					dispatch({
						type: types.NEW_MESSAGE,
						payload: {
							message: data.message,
						},
					});
				}
			});

			socket.on('message_loaded', (data: {message: IMessage}) => {
				dispatch({
					type: types.UPDATE_MESSAGE,
					payload: {
						message: data.message,
					},
				});
			});

			socket.on('update_message', (data: {message: IMessage}) => {
				dispatch({
					type: types.UPDATE_MESSAGE,
					payload: {
						message: data.message,
					},
				});
			});

			socket.on('read_message', (data: {messageId: string}) => {
				dispatch({
					type: types.READ_MESSAGE,
					payload: {
						messageId: data.messageId,
					},
				});
			});

			socket.on('remove_messages', (data: {messages: string[]}) => {
				dispatch({
					type: types.REMOVE_MESSAGES,
					payload: {
						messages: data.messages,
					},
				});
			});
		});

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		socketInit();
		socketListeners();

		return function cleanup() {
			socket.close();
		};
	}, [socketInit, socketListeners]);

	const handleSubmitMessage = async (message: IMessageInputs) => {
		if (message.type === 'text') {
			socket.emit('new_message', {
				message: {
					user: auth.user._id,
					text: message.text,
				},
			});
		}

		if (message.type === 'audio') {
			const loadingId = uuidv4();

			socket.emit('preload_message', {
				message: {
					loadingId,
					user: auth.user._id,
					type: 'audio',
				},
			});

			const formData = new FormData();
			formData.append('file', message.audio);
			formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
			formData.append('resource_type', 'video');
			if (process.env.NODE_ENV !== 'production') {
				formData.append('folder', 'test');
			}
			const {data} = await axios.post(String(process.env.REACT_APP_CLOUD_UPLOAD_URL), formData);

			socket.emit('message_loaded', {
				message: {
					loadingId,
					user: auth.user._id,
					audio: data.public_id,
				},
			});
		}
	};

	const handleCancelLoadingMessage = (message: IMessage) => {
		socket.emit('cancel_loading_message', {message});
	};

	const handleReadMessage = (messageId: string) => {
		if (auth.isAuth) {
			socket.emit('read_message', {messageId});
		}
	};

	const handleEditMessage = (message: IMessage) => {
		socket.emit('update_message', {
			message: {
				...message,
				edited: true,
			},
		});
	};

	const handleRemoveMessages = (messages: string[]) => {
		socket.emit('remove_messages', {messages});

		dispatch({
			type: types.REMOVE_MESSAGES,
			payload: {
				messages: messages,
			},
		});
	};

	return (
		<section className='global-chat'>
			<Helmet>
				<title>Global chat / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<GlobalChatContext.Provider
				value={{
					activeUsers,
					handleSubmitMessage,
					handleCancelLoadingMessage,
					handleReadMessage,
					handleEditMessage,
					handleRemoveMessages,
				}}
			>
				<Canvas messages={messages} loading={loading} scrollDown={scrollDown} />
			</GlobalChatContext.Provider>
		</section>
	);
};

export default GlobalChat;
