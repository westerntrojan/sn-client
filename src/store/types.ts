import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {rootReducer} from './index';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;

enum Role {
	ADMIN,
	MODERATOR,
	USER,
}

export interface IUser {
	readonly _id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	info?: {
		bio: string;
	};
	avatar: {
		images: string[];
		color: string;
	};
	role: Role.ADMIN | Role.MODERATOR | Role.USER;
	likedArticles: string[];
	isRemoved: boolean;
}

export interface IComment {
	readonly _id: string;
	readonly articleId: string;
	text: string;
	user: IUser;
	likes: number;
	dislikes: number;
	created: string;
}

export interface ICategory {
	readonly _id: string;
	title: string;
	desc: string;
	subs: number;
	slug: string;
}

export interface IArticle {
	readonly _id: string;
	title: string;
	text: string;
	image: string;
	tags: string[];
	category: ICategory;
	slug: string;
	user: IUser;
	views: number;
	likes: number;
	comments: IComment[];
	created: string;
}
