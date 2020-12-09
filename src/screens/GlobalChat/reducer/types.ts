import {IMessage} from '@components/common/chats/types';

export const ACTIVE_USERS = 'chat/activeUsers';
export const PRE_MESSAGES = 'chat/preMessages';
export const NEW_MESSAGE = 'chat/newMessage';
export const NEW_MESSAGE_FROM_ME = 'chat/newMessageFromMe';
export const UPDATE_MESSAGE = 'chat/updateMessage';
export const READ_MESSAGE = 'chat/readMessage';
export const REMOVE_MESSAGES = 'chat/removeMessages';

type ActiveUsers = {
	type: typeof ACTIVE_USERS;
	payload: {
		count: number;
	};
};
type PreMessages = {
	type: typeof PRE_MESSAGES;
	payload: {
		messages: IMessage[];
	};
};
type NewMessage = {
	type: typeof NEW_MESSAGE;
	payload: {
		message: IMessage;
	};
};
type NewMessageFromMe = {
	type: typeof NEW_MESSAGE_FROM_ME;
	payload: {
		message: IMessage;
	};
};
type UpdateMessage = {
	type: typeof UPDATE_MESSAGE;
	payload: {
		message: IMessage;
	};
};
type ReadMessage = {
	type: typeof READ_MESSAGE;
	payload: {
		messageId: string;
	};
};
type RemoveMessages = {
	type: typeof REMOVE_MESSAGES;
	payload: {
		messages: string[];
	};
};

export type Action =
	| ActiveUsers
	| PreMessages
	| NewMessage
	| NewMessageFromMe
	| UpdateMessage
	| ReadMessage
	| RemoveMessages;

export type State = {
	activeUsers: number;
	messages: IMessage[];
	loading: boolean;
	scrollDown: boolean;
};
