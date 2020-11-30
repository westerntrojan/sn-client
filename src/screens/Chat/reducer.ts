import {IMessage} from '@components/common/chats/types';

type State = {
	activeUsers: number;
	messages: {
		all: IMessage[];
		end: boolean;
	};
	loading: boolean;
	scrollDown: boolean;
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
		message: IMessage;
	};
};
type NEW_MESSAGE_FROM_ME = {
	type: 'NEW_MESSAGE_FROM_ME';
	payload: {
		message: IMessage;
	};
};
type LOAD_MORE = {
	type: 'LOAD_MORE';
	payload: {
		messages: IMessage[];
		end: boolean;
	};
};
type READ_MESSAGE = {
	type: 'READ_MESSAGE';
	payload: {
		messageId: string;
	};
};
type REMOVE_MESSAGES = {
	type: 'REMOVE_MESSAGES';
	payload: {
		messages: string[];
	};
};

type Action =
	| ACTIVE_USERS
	| PRE_MESSAGES
	| NEW_MESSAGE
	| NEW_MESSAGE_FROM_ME
	| LOAD_MORE
	| READ_MESSAGE
	| REMOVE_MESSAGES;

export const initialState: State = {
	activeUsers: 0,
	messages: {
		all: [],
		end: false,
	},
	loading: true,
	scrollDown: true,
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
				scrollDown: false,
				messages: {
					...state.messages,
					all: state.messages.all.concat(action.payload.message),
				},
			};
		case 'NEW_MESSAGE_FROM_ME':
			return {
				...state,
				scrollDown: true,
				messages: {
					...state.messages,
					all: state.messages.all.concat(action.payload.message),
				},
			};
		case 'LOAD_MORE':
			return {
				...state,
				scrollDown: false,
				messages: {
					...state.messages,
					all: action.payload.messages.concat(state.messages.all),
					end: action.payload.end,
				},
			};
		case 'READ_MESSAGE':
			return {
				...state,
				scrollDown: false,
				messages: {
					...state.messages,
					all: state.messages.all.map(message => {
						if (message._id === action.payload.messageId) {
							return {
								...message,
								isRead: true,
							};
						}

						return message;
					}),
				},
			};
		case 'REMOVE_MESSAGES':
			return {
				...state,
				scrollDown: false,
				messages: {
					...state.messages,
					all: state.messages.all.filter(message => !action.payload.messages.includes(message._id)),
				},
			};
		default:
			return state;
	}
};
