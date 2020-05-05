import {IUser} from '@store/types';

export interface IMessage {
	_id: string;
	user: IUser;
	text: string;
	created: string;
}

export interface IFetchData {
	user: IUser;
}

export interface IClearHistoryData {
	success: boolean;
}
