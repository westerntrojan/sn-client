import {IUser} from '@store/types';

export const LOGIN = 'auth/login';
export const REGISTER = 'auth/register';
export const VERIFY = 'auth/verify';
export const EXIT = 'auth/exit';
export const CHANGE_AVATAR = 'auth/changeAvatar';
export const REMOVE_AVATAR = 'auth/removeAvatar';
export const TWO_FACTOR_AUTH = 'auth/twoFactorAuth';

type Exit = {
	type: typeof EXIT;
};

export type AuthActionTypes = Exit;

export type AuthState = {
	isAuth: boolean;
	isAdmin: boolean;
	user: IUser;
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
	emailVerified: true,
	twoFactorAuth: false,
	isRemoved: false,
	created: '',
};
