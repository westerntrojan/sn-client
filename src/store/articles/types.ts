import {IArticle} from '@store/types';

export const FETCH_ARTICLES = 'articles/fetch';
export const END_ARTICLES = 'articles/end';
export const GET_ARTICLES = 'articles/getAll';
export const GET_ARTICLE = 'articles/getOne';
export const ADD_ARTICLE = 'articles/add';
export const EDIT_ARTICLE = 'articles/edit';
export const REMOVE_ARTICLE = 'articles/remove';
export const ADD_VIEW = 'articles/addView';
export const ADD_LIKE = 'articles/addLike';
export const ADD_DISLIKE = 'articles/addDislike';
export const ADD_COMMENT = 'articles/comments/add';
export const REMOVE_COMMENT = 'articles/comments/remove';
export const ADD_REPLY = 'articles/replies/add';
export const REMOVE_REPLY = 'articles/replies/remove';
export const ADD_COMMENT_LIKE = 'articles/comments/addLike';
export const ADD_COMMENT_DISLIKE = 'articles/comments/addDislike';
export const SORT_COMMENTS_BY_TOP_ARTICLES = 'articles/comments/sortByTopArticles';
export const SORT_COMMENTS_BY_NEWEST_FIRST = 'articles/comments/sortByNewestFirst';

export type ArticlesState = {
	all: IArticle[];
	end: boolean;
	cache: IArticle[];
};
