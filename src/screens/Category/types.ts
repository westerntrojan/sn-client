import {IArticle} from '@/store/types';

export interface IFetchData {
	success: boolean;
	articles: IArticle[];
}
