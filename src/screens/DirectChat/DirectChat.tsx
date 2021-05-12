import React, {useEffect, useCallback, useReducer} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

import './DirectChat.scss';
import Canvas from './Canvas';
import {RootState} from '@/store/types';
import {IMessage} from '@/components/common/chats/types';
import {getToken} from '@/utils/auth';
import Context from './context';
import reducer, {initialState} from './reducer';
import * as types from './reducer/types';

let socket: SocketIOClient.Socket;

const Direct: React.FC = () => {
	const {chatId} = useParams<{chatId: string}>();

	const [{messages, endMessages, loading, scrollDown, typing, error}, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {enqueueSnackbar} = useSnackbar();

	const _handleError = useCallback(() => {
		enqueueSnackbar('Something went wrong. Try reload page', {variant: 'error'});

		dispatch({type: types.ERROR});
	}, [enqueueSnackbar]);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/direct`, {
			query: {
				token: getToken(),
				chatId,
			},
		});

		socket.on('error', _handleError);
		socket.on('user_error', _handleError);
	}, [_handleError]);

	const socketListeners = useCallback(() => {
		socket.on('connect', () => {
			socket.emit('user_connect');

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

			socket.on('remove_messages', (data: {messages: string[]}) => {
				dispatch({
					type: types.REMOVE_MESSAGES,
					payload: {
						messages: data.messages,
					},
				});
			});

			socket.on('load_more', (data: {messages: IMessage[]; endMessages: boolean}) => {
				dispatch({
					type: types.LOAD_MORE,
					payload: {
						messages: data.messages,
					},
				});
			});

			socket.on('typing', () => {
				dispatch({type: types.TYPING});
			});

			socket.on('typing_end', () => {
				dispatch({type: types.TYPING_END});
			});
		});

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		socketInit();
		socketListeners();

		return () => {
			socket.close();
		};
	}, [socketInit, socketListeners]);

	const handleTyping = () => {
		socket.emit('typing');
	};

	const handleTypingEnd = () => {
		socket.emit('typing_end');
	};

	const handleSubmitMessage = (text: string) => {
		socket.emit('new_message', {
			message: {
				user: auth.user._id,
				text,
			},
		});
	};

	const handleRemoveMessages = (messages: string[]) => {
		socket.emit('remove_messages', {messages});
	};

	const handleLoadMore = () => {
		socket.emit('load_more');
	};

	return (
		<section className='direct-chat'>
			<Helmet>
				<title>Direct / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Context.Provider
				value={{
					typing,
					handleSubmitMessage,
					handleTyping,
					handleTypingEnd,
				}}
			>
				<Canvas
					messages={messages}
					endMessages={endMessages}
					loading={loading}
					error={error}
					scrollDown={scrollDown}
					handleLoadMore={handleLoadMore}
					handleRemoveMessages={handleRemoveMessages}
				/>
			</Context.Provider>
		</section>
	);
};

export default Direct;
