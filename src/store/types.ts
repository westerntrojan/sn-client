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
	bio: string;
	avatar: {
		images: string[];
		color: string;
	};
	readonly role: Role.ADMIN | Role.MODERATOR | Role.USER;
	bookmarks: string[];
	readonly isRemoved: boolean;
	readonly emailVerified: boolean;
	twoFactorAuth: boolean;
	readonly created: string;
}

export interface IReply extends IComment {
	parentId: string;
}

export interface IComment {
	readonly _id: string;
	readonly articleId: string;
	readonly text: string;
	readonly user: IUser;
	likes: number;
	dislikes: number;
	readonly parentId: string | null;
	replies: IReply[];
	readonly created: string;
}

export interface ICategory {
	readonly _id: string;
	title: string;
	desc: string;
	subs: number;
	slug: string;
}

export interface IAudioTrack {
	filename: string;
	publicId: string;
}

export interface IArticle {
	readonly _id: string;
	title: string;
	text: string;
	image: string;
	video: string;
	audio: IAudioTrack[];
	tags: string[];
	category: ICategory;
	slug: string;
	readonly user: IUser;
	views: number;
	likes: number;
	dislikes: number;
	bookmarksCount: number;
	comments: IComment[];
	readonly created: string;
}
