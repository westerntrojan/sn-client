import {IUser} from '@store/types';

export interface IMessage {
	_id: string;
	user: IUser;
	text: string;
	isRead: boolean;
	created: string;
}
