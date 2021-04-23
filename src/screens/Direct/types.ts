import {IUser} from '@/store/types';

export interface IChat {
	_id: string;
	user: IUser;
	lastMessage: {
		text: string;
		created: string;
	};
}
