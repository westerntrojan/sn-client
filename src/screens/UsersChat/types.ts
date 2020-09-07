import {IUser} from '@store/types';

export interface IFetchData {
	user: IUser;
}

export interface IClearHistoryData {
	success: boolean;
}
