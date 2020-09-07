import {IUser} from '@store/types';

export interface IUserStatistics extends IUser {
	statistics: {
		articles: number;
		comments: number;
		messages: number;
	};
}

export interface IFetchData {
	success: boolean;
	user: IUserStatistics;
}
