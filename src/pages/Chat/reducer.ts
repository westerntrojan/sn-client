import {IMessage} from '@components/chat/types';

type State = {
	activeUsers: number;
	messages: {
		all: IMessage[];
		end: boolean;
	};
	loading: boolean;
	removed: boolean;
};

type ACTIVE_USERS = {
	type: 'ACTIVE_USERS';
	payload: {
		count: number;
	};
};
type PRE_MESSAGES = {
	type: 'PRE_MESSAGES';
	payload: {
		preMessages: IMessage[];
	};
};
type NEW_MESSAGE = {
	type: 'NEW_MESSAGE';
	payload: {
		newMessage: IMessage;
	};
};
type NEW_MESSAGE_FROM_ME = {
	type: 'NEW_MESSAGE_FROM_ME';
	payload: {
		newMessage: IMessage;
	};
};
type LOAD_MORE = {
	type: 'LOAD_MORE';
	payload: {
		messages: IMessage[];
		end: boolean;
	};
};
type REMOVE_MESSAGES = {
	type: 'REMOVE_MESSAGES';
	payload: {
		removedMessages: string[];
	};
};

type Action =
	| ACTIVE_USERS
	| PRE_MESSAGES
	| NEW_MESSAGE
	| NEW_MESSAGE_FROM_ME
	| LOAD_MORE
	| REMOVE_MESSAGES;

export const initialState = {
	activeUsers: 0,
	messages: {
		all: [],
		end: false,
	},
	loading: true,
	removed: false,
};

export default (state: State, action: Action): State => {
	switch (action.type) {
		case 'ACTIVE_USERS':
			return {
				...state,
				activeUsers: action.payload.count,
			};
		case 'PRE_MESSAGES':
			return {
				...state,
				loading: false,
				messages: {
					...state.messages,
					all: action.payload.preMessages,
				},
			};
		case 'NEW_MESSAGE':
			return {
				...state,
				removed: true,
				messages: {
					...state.messages,
					all: state.messages.all.concat(action.payload.newMessage),
				},
			};
		case 'NEW_MESSAGE_FROM_ME':
			return {
				...state,
				removed: false,
				messages: {
					...state.messages,
					all: state.messages.all.concat(action.payload.newMessage),
				},
			};
		case 'LOAD_MORE':
			return {
				...state,
				removed: true,
				messages: {
					...state.messages,
					all: action.payload.messages.concat(state.messages.all),
					end: action.payload.end,
				},
			};
		case 'REMOVE_MESSAGES':
			return {
				...state,
				removed: true,
				messages: {
					...state.messages,
					all: state.messages.all.filter(
						message => !action.payload.removedMessages.includes(message._id),
					),
				},
			};
		default:
			return state;
	}
};
