import {IUser} from '@store/types';

export const LOGIN = 'auth/login';
export const REGISTER = 'auth/register';
export const VERIFY = 'auth/verify';
export const EXIT = 'auth/exit';
export const CHANGE_AVATAR = 'auth/changeAvatar';
export const REMOVE_AVATAR = 'auth/removeAvatar';

export type AuthState = {
	isAuth: boolean;
	isAdmin: boolean;
	user: IUser;
	token: string | null;
};

export const defaultUser = {
	_id: '',
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	avatar: {
		images: [''],
		color: '',
	},
	role: 2,
	likedArticles: [''],
	isRemoved: false,
};
