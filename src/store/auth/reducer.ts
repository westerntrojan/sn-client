import {createReducer} from '@reduxjs/toolkit';

import {IUser} from '@/store/types';
import * as types from './types';

const initialState: types.AuthState = {
	isAuth: false,
	isAdmin: false,
	user: {} as IUser,
};

export default createReducer(initialState, {
	[types.LOGIN]: (state, action) => {
		state.isAuth = true;
		state.isAdmin = action.payload.user.role === 0 ? true : false;
		state.user = action.payload.user;
	},
	[types.EXIT]: state => {
		state.isAuth = false;
		state.isAdmin = false;
		state.user = {} as IUser;
	},
	[types.REPLACE_USER]: (state, action) => {
		state.user = action.payload.user;
	},
	[types.ADD_AVATAR]: (state, action) => {
		state.user.avatar.images = [action.payload.newAvatar, ...state.user.avatar.images];
	},
	[types.REMOVE_AVATAR]: (state, action) => {
		state.user.avatar.images = state.user.avatar.images.filter(
			image => image !== action.payload.image,
		);
	},
	[types.TWO_FACTOR_AUTH]: state => {
		state.user.twoFactorAuth = !state.user.twoFactorAuth;
	},
	[types.FOLLOW_TO_USER]: (state, action) => {
		state.user.following.push(action.payload.userId);
	},
	[types.UNFOLLOW_FROM_USER]: (state, action) => {
		state.user.following = state.user.following.filter(userId => userId !== action.payload.userId);
	},
	[types.ADD_TO_BOOKMARKS]: (state, action) => {
		state.user.bookmarks = state.user.bookmarks.concat(action.payload.articleId);
	},
	[types.REMOVE_FROM_BOOKMARKS]: (state, action) => {
		state.user.bookmarks = state.user.bookmarks.filter(
			articleId => articleId !== action.payload.articleId,
		);
	},
});
