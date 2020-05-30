import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import socketIoClient from 'socket.io-client';
import {useSnackbar} from 'notistack';

import './style.scss';
import Canvas from './components/Canvas';
import {RootState} from '@store/types';
import {IMessage} from '@components/chat/types';
import Context from './context';

let socket: SocketIOClient.Socket;

const Chat: React.FC = () => {
	const [activeUsers, setActiveUsers] = useState(0);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [removed, setRemoved] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const _handleError = useCallback((): void => {
		enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	}, [enqueueSnackbar]);

	const socketInit = useCallback(() => {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/main`);
		socket.on('error', _handleError);
		socket.on('user_error', _handleError);

		socket.on('connect', () => {
			socket.emit('user_connect');
		});
	}, [_handleError]);

	const socketListeners = useCallback(() => {
		if (loading) {
			socket.on('pre_messages', (preMessages: IMessage[]) => {
				setLoading(false);
				setMessages(preMessages);
			});
		}

		socket.on('active_users', (count: number) => setActiveUsers(count));
		socket.on('new_message', (message: IMessage) => {
			if (message.user._id === auth.user._id) {
				setRemoved(false);
			} else {
				setRemoved(true);
			}

			setMessages(messages.concat(message));
		});
		socket.on('remove_messages', (removedMessages: string[]) => {
			setRemoved(true);

			setMessages(messages.filter(message => !removedMessages.includes(message._id)));
		});
	}, [messages, loading, auth]);

	useEffect(() => {
		socketInit();
		socketListeners();

		return function cleanup(): void {
			socket.disconnect();
			socket.close();
		};
	}, [socketInit, socketListeners]);

	const handleRemoveMessages = (messages: string[]): void => {
		socket.emit('remove_messages', messages);
	};

	const handleSubmitMessage = (message: any): void => {
		socket.emit('new_message', {user: auth.user._id, ...message});
	};

	const loadMore = (): void => {
		console.log('loadMore');
	};

	return (
		<section className='chat'>
			<Helmet>
				<title>Chat / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Context.Provider value={{activeUsers, handleSubmitMessage}}>
				<Canvas
					messages={messages}
					auth={auth}
					removed={removed}
					loading={loading}
					loadMore={loadMore}
					handleRemoveMessages={handleRemoveMessages}
				/>
			</Context.Provider>
		</section>
	);
};

export default Chat;
