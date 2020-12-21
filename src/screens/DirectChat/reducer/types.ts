import {IMessage} from '@components/common/chats/types';

export const PRE_MESSAGES = 'directChat/preMessages';
export const NEW_MESSAGE = 'directChat/newMessage';
export const NEW_MESSAGE_FROM_ME = 'directChat/newMessageFromMe';
export const REMOVE_MESSAGES = 'directChat/removeMessages';
export const LOAD_MORE = 'directChat/loadMore';
export const TYPING = 'directChat/typing';
export const TYPING_END = 'directChat/typingEnd';
export const ERROR = 'directChat/error';

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
type RemoveMessages = {
	type: typeof REMOVE_MESSAGES;
	payload: {
		messages: string[];
	};
};
type LoadMore = {
	type: typeof LOAD_MORE;
	payload: {
		messages: IMessage[];
	};
};
type Typing = {
	type: typeof TYPING;
};
type TypingEnd = {
	type: typeof TYPING_END;
};
type Error = {
	type: typeof ERROR;
};

export type Action =
	| PreMessages
	| NewMessage
	| NewMessageFromMe
	| RemoveMessages
	| LoadMore
	| Typing
	| TypingEnd
	| Error;

export type State = {
	messages: IMessage[];
	endMessages: boolean;
	loading: boolean;
	scrollDown: boolean;
	typing: boolean;
	error: boolean;
};
