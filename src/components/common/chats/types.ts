import {IUser} from '@store/types';

export interface IMessage {
	_id: string;
	user: IUser;
	audio: string;
	text: string;
	isRead: boolean;
	type: 'text' | 'audio';
	created: string;
}

export interface IMessageInputs {
	audio: Blob;
	text: string;
	type: 'text' | 'audio';
}
