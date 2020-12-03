import {IUser} from '@store/types';

export interface IMessage {
	_id: string;
	user: IUser;
	audio: string;
	text: string;
	type: 'text' | 'audio';
	loading: boolean;
	isRead: boolean;
	edited: boolean;
	created: string;
}

export interface IMessageInputs {
	audio: Blob;
	text: string;
	type: 'text' | 'audio';
}
