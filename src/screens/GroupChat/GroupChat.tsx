import React, {useEffect, useCallback, useReducer} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';
import {useParams} from 'react-router';

import './GroupChat.scss';
import Canvas from './Canvas';
import {RootState} from '@store/types';
import {IMessage} from '@components/common/chats/types';
import GroupChatContext from './GroupChatContext';
import reducer, {initialState} from './reducer';
import * as types from './reducer/types';
import {getToken} from '@utils/auth';

let socket: SocketIOClient.Socket;

const GroupChat: React.FC = () => {
	const {groupId} = useParams();

	const [{messages, loading, scrollDown}, dispatch] = useReducer(reducer, initialState);

	const {enqueueSnackbar} = useSnackbar();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const _handleError = useCallback(() => {
		enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	}, [enqueueSnackbar]);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/group`, {
			query: {
				token: getToken(),
				groupId,
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

	const handleSubmitMessage = async (text: string) => {
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

	return (
		<section className='group-chat'>
			<Helmet>
				<title>Group / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<GroupChatContext.Provider
				value={{
					handleSubmitMessage,
					handleRemoveMessages,
				}}
			>
				<Canvas messages={messages} loading={loading} scrollDown={scrollDown} />
			</GroupChatContext.Provider>
		</section>
	);
};

export default GroupChat;
