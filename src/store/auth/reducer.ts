import {createReducer} from '@reduxjs/toolkit';

import {defaultUser} from './types';
import {ADD_TO_BOOKMARKS, REMOVE_FROM_BOOKMARKS} from '@store/articles/types';
import * as types from './types';

const initialState: types.AuthState = {
	isAuth: false,
	isAdmin: false,
	user: defaultUser,
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
		state.user = defaultUser;
	},
	[types.REPLACE_USER]: (state, action) => {
		state.user = action.payload.user;
	},
	[types.CHANGE_AVATAR]: (state, action) => {
		state.user.avatar.images = [action.payload.image, ...state.user.avatar.images];
	},
	[types.REMOVE_AVATAR]: (state, action) => {
		state.user.avatar.images = state.user.avatar.images.filter(
			image => image !== action.payload.image,
		);
	},
	[types.TWO_FACTOR_AUTH]: (state, action) => {
		state.user.twoFactorAuth = !state.user.twoFactorAuth;
	},
	[ADD_TO_BOOKMARKS]: (state, action) => {
		state.user.bookmarks = state.user.bookmarks.concat(action.payload.articleId);
	},
	[REMOVE_FROM_BOOKMARKS]: (state, action) => {
		state.user.bookmarks = state.user.bookmarks.filter(
			articleId => articleId !== action.payload.articleId,
		);
	},
});
