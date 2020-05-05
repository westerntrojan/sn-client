import {createReducer} from '@reduxjs/toolkit';

import * as types from './types';
import {defaultUser} from './types';
import {ADD_LIKE, REMOVE_LIKE} from '@store/articles/types';

const initialState: types.AuthState = {
	isAuth: false,
	isAdmin: false,
	user: defaultUser,
	token: null,
};

export default createReducer(initialState, {
	[types.LOGIN]: (state, action) => {
		state.isAuth = true;
		state.isAdmin = action.payload.user.role === 0 ? true : false;
		state.user = action.payload.user;
		state.token = action.payload.token;
	},
	[types.REGISTER]: (state, action) => {
		state.isAuth = true;
		state.user = action.payload.user;
		state.token = action.payload.token;
	},
	[types.EXIT]: state => {
		state.isAuth = false;
		state.isAdmin = false;
		state.user = defaultUser;
		state.token = null;
	},
	[types.CHANGE_AVATAR]: (state, action) => {
		state.user.avatar.images = [action.payload.image, ...state.user.avatar.images];
	},
	[types.REMOVE_AVATAR]: (state, action) => {
		state.user.avatar.images = state.user.avatar.images.filter(
			image => image !== action.payload.image,
		);
	},
	[ADD_LIKE]: (state, action) => {
		state.user.likedArticles = state.user.likedArticles.concat(action.payload.articleId);
	},
	[REMOVE_LIKE]: (state, action) => {
		state.user.likedArticles = state.user.likedArticles.filter(
			articleId => articleId !== action.payload.articleId,
		);
	},
});
