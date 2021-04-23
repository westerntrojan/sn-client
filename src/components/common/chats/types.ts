import {IUser} from '@/store/types';

export interface IMessage {
	_id: string;
	user: IUser;
	audio: string;
	text: string;
	type: 'text' | 'audio';
	isRead: boolean;
	edited: boolean;
	loadingId: string;
	created: string;
}

export interface IMessageInputs {
	audio: Blob;
	text: string;
	type: 'text' | 'audio';
}
