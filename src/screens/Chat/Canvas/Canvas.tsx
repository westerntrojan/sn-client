import React, {useEffect, useRef, useContext, useReducer} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {useSelector, shallowEqual} from 'react-redux';

import Loader from '@components/common/loaders/Loader';
import {RemoveModal} from '@components/common/modals';
import Header from './Header';
import Message from './Message';
import Form from './Form';
import MyMessage from './MyMessage';
import AlterHeader from './AlterHeader';
import {IMessage} from '@components/common/chats/types';
import {RootState} from '@store/types';
import ChatContext from '@screens/Chat/ChatContext';
import CanvasContext from './CanvasContext';
import reducer, {initialState} from './reducer';
import * as types from './reducer/types';

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
	messages: IMessage[];
	scrollDown: boolean;
	loading: boolean;
};

const Canvas: React.FC<Props> = ({messages, scrollDown, loading}) => {
	const classes = useStyles();

	const {handleRemoveMessages} = useContext(ChatContext);

	const [state, dispatch] = useReducer(reducer, initialState);

	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	useEffect(() => {
		if (scrollDown) {
			if (messagesContainerRef.current) {
				messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
			}
		}
	}, [messages, scrollDown]);

	useEffect(() => {
		if (state.selectedMessages) {
			const messagesIds = messages.map(message => message._id);

			state.selectedMessages.forEach(messageId => {
				if (!messagesIds.includes(messageId)) {
					dispatch({
						type: types.SELECT_MESSAGE,
						payload: {
							messageId,
						},
					});
				}
			});
		}

		// eslint-disable-next-line
	}, [messages]);

	return (
		<Paper className={classes.root}>
			<CanvasContext.Provider value={{state, dispatch}}>
				{Boolean(state.selectedMessages.length) ? <AlterHeader /> : <Header />}

				<Divider />

				<div className={classes.messages} ref={messagesContainerRef}>
					{loading && <Loader />}

					{auth.user &&
						messages &&
						messages.map(message => {
							if (message.user._id === auth.user._id) {
								return <MyMessage key={message._id} message={message} />;
							}

							return <Message key={message._id} message={message} />;
						})}

					{!auth.user &&
						messages &&
						messages.map(message => <Message key={message._id} message={message} />)}
				</div>

				<Divider />

				<Form />
			</CanvasContext.Provider>

			<RemoveModal
				open={state.removeMessagesModal}
				action={() => {
					dispatch({
						type: types.REMOVE_MESSAGES,
					});

					handleRemoveMessages(state.selectedMessages);
				}}
				text={
					state.selectedMessages.length > 1
						? `Do you want to remove ${state.selectedMessages.length} messages?`
						: 'Do you want to remove this message?'
				}
				closeModal={() => dispatch({type: types.CLOSE_REMOVE_MESSAGES_MODAL})}
			/>
		</Paper>
	);
};

export default Canvas;
