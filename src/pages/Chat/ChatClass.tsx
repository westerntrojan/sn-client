import React, {PureComponent} from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import socketIoClient from 'socket.io-client';
import {withSnackbar, OptionsObject} from 'notistack';

import './style.scss';
import Canvas from './components/Canvas';
import {RootState} from '@store/types';
import {AuthState} from '@store/auth/types';
import {IMessage} from '@components/chat/types';
import {ISendingMessage} from './types';
import Context from './context';

let socket: SocketIOClient.Socket;

type Props = {
	auth: AuthState;
	enqueueSnackbar: (message: string, options: OptionsObject) => void;
};

type State = {
	activeUsers: number;
	messages: {
		all: IMessage[];
		end: boolean;
	};
	loading: boolean;
	removed: boolean;
};

class ChatClass extends PureComponent<Props, State> {
	state = {
		activeUsers: 0,
		messages: {
			all: [],
			end: false,
		},
		loading: true,
		removed: false,
	};

	_handleError = (): void => {
		this.props.enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	};

	componentDidMount(): void {
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/main`);

		socket.on('error', this._handleError);
		socket.on('user_error', this._handleError);

		socket.on('connect', () => {
			socket.emit('user_connect');

			socket.on('active_users', (count: number) => this.setState({activeUsers: count}));

			if (this.state.loading) {
				socket.on('pre_messages', (messages: IMessage[]) => {
					this.setState(prevState => ({
						loading: false,
						messages: {
							...prevState.messages,
							all: messages,
						},
					}));
				});
			}

			socket.on('new_message', (message: IMessage) => {
				if (message.user._id === this.props.auth.user._id) {
					this.setState(prevState => ({
						removed: false,
						messages: {
							...prevState.messages,
							all: prevState.messages.all.concat(message),
						},
					}));
				} else {
					this.setState(prevState => ({
						removed: true,
						messages: {
							...prevState.messages,
							all: prevState.messages.all.concat(message),
						},
					}));
				}
			});

			socket.on('load_more', ({messages, end}: {messages: IMessage[]; end: boolean}) => {
				this.setState(prevState => ({
					removed: true,
					messages: {
						all: [...messages, ...prevState.messages.all],
						end,
					},
				}));
			});

			socket.on('remove_messages', (removedMessages: string[]) => {
				this.setState(prevState => ({
					removed: true,
					messages: {
						...prevState.messages,
						all: prevState.messages.all.filter(
							(message: IMessage) => !removedMessages.includes(message._id),
						),
					},
				}));
			});
		});
	}

	componentWillUnmount(): void {
		socket.close();
	}

	handleRemoveMessages = (messages: string[]): void => {
		socket.emit('remove_messages', messages);
	};

	handleSubmitMessage = async (message: ISendingMessage): Promise<void> => {
		const user = this.props.auth.user._id;
		const {type, text, image, caption} = message;

		if (type === 'text' && text) {
			socket.emit('new_message', {user, type, text});

			return;
		}

		const formData = new FormData();
		formData.append('user', user);
		formData.append('type', type);

		if (type === 'image' && image) {
			formData.append('image', image);
		}

		if (type === 'image_caption' && image && caption) {
			formData.append('image', image);
			formData.append('caption', caption);
		}

		console.log(formData);
	};

	loadMore = (): void => {
		if (!this.state.messages.end) {
			socket.emit('load_more', {skip: this.state.messages.all.length});
		}
	};

	render(): React.ReactNode {
		return (
			<section className='chat'>
				<Helmet>
					<title>Chat / {process.env.REACT_APP_TITLE}</title>
				</Helmet>

				<Context.Provider
					value={{
						activeUsers: this.state.activeUsers,
						handleSubmitMessage: this.handleSubmitMessage,
					}}
				>
					<Canvas
						messages={this.state.messages.all}
						auth={this.props.auth}
						removed={this.state.removed}
						loading={this.state.loading}
						loadMore={this.loadMore}
						handleRemoveMessages={this.handleRemoveMessages}
					/>
				</Context.Provider>
			</section>
		);
	}
}

type StateToProps = {
	auth: AuthState;
};

const mapStateToProps = (state: RootState): StateToProps => ({
	auth: state.auth,
});

export default withSnackbar(connect(mapStateToProps)(ChatClass));
