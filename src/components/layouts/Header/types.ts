import {IArticle, IUser} from '@/store/types';

export interface ISearchResult {
	articles: IArticle[];
	users: IUser[];
}
