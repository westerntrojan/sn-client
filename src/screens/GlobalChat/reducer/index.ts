import * as types from './types';

export const initialState: types.State = {
	activeUsers: 0,
	messages: [],
	loading: true,
	scrollDown: true,
};

export default (state: types.State, action: types.Action): types.State => {
	switch (action.type) {
		case types.ACTIVE_USERS:
			return {
				...state,
				activeUsers: action.payload.count,
			};
		case types.PRE_MESSAGES:
			return {
				...state,
				loading: false,
				messages: action.payload.messages,
			};
		case types.NEW_MESSAGE:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.concat(action.payload.message),
			};
		case types.NEW_MESSAGE_FROM_ME:
			return {
				...state,
				scrollDown: true,
				messages: state.messages.concat(action.payload.message),
			};
		case types.UPDATE_MESSAGE:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.map(message => {
					if (message._id === action.payload.message._id) {
						return action.payload.message;
					}
					return message;
				}),
			};
		case types.READ_MESSAGE:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.map(message => {
					if (message._id === action.payload.messageId) {
						return {
							...message,
							isRead: true,
						};
					}

					return message;
				}),
			};
		case types.REMOVE_MESSAGES:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.filter(message => !action.payload.messages.includes(message._id)),
			};
		default:
			return state;
	}
};
