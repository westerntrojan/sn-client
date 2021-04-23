import {IUser} from '@/store/types';

export interface IUserStatistics extends IUser {
	statistics: {
		articles: number;
		followers: number;
		following: number;
	};
}

export interface IFetchData {
	success: boolean;
	user: IUserStatistics;
}
