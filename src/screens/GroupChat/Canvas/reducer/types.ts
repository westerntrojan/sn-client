export const SELECT_MESSAGE = 'chat/canvas/selectMessage';
export const CLEAR_SELECTED_MESSAGES = 'chat/canvas/clearSelectedMessages';
export const OPEN_REMOVE_MESSAGES_MODAL = 'chat/canvas/openRemoveMessagesModal';
export const CLOSE_REMOVE_MESSAGES_MODAL = 'chat/canvas/closeRemoveMessagesModal';
export const REMOVE_MESSAGES = 'chat/canvas/removeMessages';

type SelectMessage = {
	type: typeof SELECT_MESSAGE;
	payload: {
		messageId: string;
	};
};
type ClearSelectedMessages = {
	type: typeof CLEAR_SELECTED_MESSAGES;
};

type OpenRemoveMessagesModal = {
	type: typeof OPEN_REMOVE_MESSAGES_MODAL;
};
type CloseRemoveMessagesModal = {
	type: typeof CLOSE_REMOVE_MESSAGES_MODAL;
};
type RemoveMessages = {
	type: typeof REMOVE_MESSAGES;
};

export type Action =
	| SelectMessage
	| ClearSelectedMessages
	| OpenRemoveMessagesModal
	| CloseRemoveMessagesModal
	| RemoveMessages;

export type State = {
	selectedMessages: string[];
	removeMessagesModal: boolean;
};
