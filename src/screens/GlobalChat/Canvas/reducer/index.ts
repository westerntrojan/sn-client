import * as types from './types';

export const initialState: types.State = {
	selectedMessages: [],
	removeMessagesModal: false,
	editedMessage: null,
};

export default (state: types.State, action: types.Action): types.State => {
	switch (action.type) {
		case types.SELECT_MESSAGE:
			return {
				...state,
				selectedMessages: state.selectedMessages.includes(action.payload.messageId)
					? state.selectedMessages.filter(messageId => messageId !== action.payload.messageId)
					: state.selectedMessages.concat(action.payload.messageId),
			};
		case types.CLEAR_SELECTED_MESSAGES:
			return {
				...state,
				selectedMessages: [],
			};
		case types.SET_EDITED_MESSAGE:
			return {
				...state,
				editedMessage: action.payload.message,
			};
		case types.REMOVE_EDITED_MESSAGE:
			return {
				...state,
				editedMessage: null,
			};
		case types.OPEN_REMOVE_MESSAGES_MODAL:
			return {
				...state,
				removeMessagesModal: true,
			};
		case types.CLOSE_REMOVE_MESSAGES_MODAL:
			return {
				...state,
				removeMessagesModal: false,
			};
		case types.REMOVE_MESSAGES:
			return {
				...state,
				selectedMessages: [],
				removeMessagesModal: false,
			};
		default:
			return state;
	}
};
