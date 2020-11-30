import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';
import axios from 'axios';

import './Chat.scss';
import Canvas from './Canvas';
import {BackdropLoader} from '@components/common/loaders';
import {RootState} from '@store/types';
import {IMessage, IMessageInputs} from '@components/common/chats/types';
import Context from './context';
import reducer, {initialState} from './reducer';

let socket: SocketIOClient.Socket;

const Chat: React.FC = () => {
	const [{activeUsers, messages, loading, scrollDown}, dispatch] = useReducer(
		reducer,
		initialState,
	);
	const [loadingMedia, setLoadingMedia] = useState(false);

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

			socket.on('new_message', (data: {message: IMessage}) => {
				if (data.message.user._id === auth.user._id) {
					dispatch({
						type: 'NEW_MESSAGE_FROM_ME',
						payload: {
							message: data.message,
						},
					});
				} else {
					dispatch({
						type: 'NEW_MESSAGE',
						payload: {
							message: data.message,
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

			socket.on('read_message', (data: {messageId: string}) => {
				dispatch({
					type: 'READ_MESSAGE',
					payload: {
						messageId: data.messageId,
					},
				});
			});

			socket.on('remove_messages', (data: {messages: string[]}) => {
				dispatch({
					type: 'REMOVE_MESSAGES',
					payload: {
						messages: data.messages,
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

	const handleRemoveMessages = (messages: string[]): void => {
		socket.emit('remove_messages', {messages});
	};

	const handleSubmitMessage = async (message: IMessageInputs): Promise<void> => {
		const user = auth.user._id;

		if (message.type === 'text') {
			socket.emit('new_message', {
				message: {
					...message,
					user,
				},
			});
		}

		if (message.type === 'audio') {
			setLoadingMedia(true);

			const formData = new FormData();
			formData.append('file', message.audio);
			formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
			formData.append('resource_type', 'video');
			if (process.env.NODE_ENV !== 'production') {
				formData.append('folder', 'test');
			}

			const {data} = await axios.post(String(process.env.REACT_APP_CLOUD_UPLOAD_URL), formData);

			socket.emit('new_message', {
				message: {
					...message,
					user,
					audio: data.public_id,
				},
			});

			setLoadingMedia(false);
		}
	};

	const handleReadMessage = (messageId: string): void => {
		if (auth.isAuth) {
			socket.emit('read_message', {messageId});
		}
	};

	return (
		<section className='chat'>
			<Helmet>
				<title>Chat / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Context.Provider value={{activeUsers, handleSubmitMessage, handleReadMessage}}>
				<Canvas
					messages={messages.all}
					auth={auth}
					loading={loading}
					scrollDown={scrollDown}
					loadMore={loadMore}
					handleRemoveMessages={handleRemoveMessages}
				/>
			</Context.Provider>

			<BackdropLoader open={loadingMedia} />
		</section>
	);
};

export default Chat;
