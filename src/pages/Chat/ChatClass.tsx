import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import socketIoClient from 'socket.io-client';
import {withSnackbar, OptionsObject} from 'notistack';

import './style.scss';
import Canvas from './components/Canvas';
import {RootState} from '@store/types';
import {AuthState} from '@store/auth/types';
import {IMessage} from './types';
import Context from './context';

let socket: SocketIOClient.Socket;

type Props = {
	auth: AuthState;
	enqueueSnackbar: (message: string, options: OptionsObject) => void;
};

type State = {
	activeUsers: number;
	messages: IMessage[];
	loading: boolean;
	removed: boolean;
};

class ChatClass extends Component<Props, State> {
	state = {
		activeUsers: 0,
		messages: [],
		loading: true,
		removed: false,
	};

	_handleError = (): void => {
		this.props.enqueueSnackbar('Network error. Try reload page', {variant: 'error'});
	};

	componentDidMount(): void {
		console.log('componentDidMount');

		// socketInit
		socket = socketIoClient(`${process.env.REACT_APP_SOCKET}/main`);
		socket.on('error', this._handleError);
		socket.on('user_error', this._handleError);

		socket.on('disconnect', () => {
			console.log('[ChatClass] disconnect');
		});

		socket.on('connect', () => {
			console.log('[ChatClass] connect');

			socket.emit('user_connect');

			// socketListeners
			socket.on('active_users', (count: number) => this.setState({activeUsers: count}));

			if (this.state.loading) {
				socket.on('pre_messages', (preMessages: IMessage[]) => {
					this.setState({loading: false});
					this.setState({messages: preMessages});
				});
			}

			socket.on('new_message', (message: IMessage) => {
				if (message.user._id === this.props.auth.user._id) {
					this.setState({removed: false});
				} else {
					this.setState({removed: true});
				}

				this.setState(prevState => ({messages: prevState.messages.concat(message)}));
			});
			socket.on('remove_messages', (removedMessages: string[]) => {
				this.setState({removed: true});

				this.setState(prevState => ({
					messages: prevState.messages.filter(
						(message: IMessage) => !removedMessages.includes(message._id),
					),
				}));
			});
		});
	}

	componentDidUpdate(): void {
		console.log('componentDidUpdate');
	}

	componentWillUnmount(): void {
		console.log('componentWillUnmount');

		socket.disconnect();
		socket.close();
	}

	handleRemoveMessages = (messages: string[]): void => {
		socket.emit('remove_messages', messages);
	};

	handleSubmitMessage = (message: any): void => {
		socket.emit('new_message', {user: this.props.auth.user._id, ...message});
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
						messages={this.state.messages}
						auth={this.props.auth}
						removed={this.state.removed}
						loading={this.state.loading}
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
