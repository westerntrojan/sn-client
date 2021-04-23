import {IMessage} from '@/components/common/chats/types';

export const PRE_MESSAGES = 'chat/preMessages';
export const NEW_MESSAGE = 'chat/newMessage';
export const NEW_MESSAGE_FROM_ME = 'chat/newMessageFromMe';
export const REMOVE_MESSAGES = 'chat/removeMessages';

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

export type Action = PreMessages | NewMessage | NewMessageFromMe | RemoveMessages;

export type State = {
	messages: IMessage[];
	loading: boolean;
	scrollDown: boolean;
};
