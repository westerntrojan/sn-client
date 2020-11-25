import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import {setToken, removeToken} from '@utils/auth';
import {AppThunk} from '@store/types';
import * as types from './types';
import {IUser} from '@store/types';

export const login = (userData: {rememberMe: boolean}): AppThunk => async (
	dispatch,
): Promise<object> => {
	const data = await callApi.post('/auth/login', userData);

	if (data.success) {
		setToken({token: data.token, rememberMe: userData.rememberMe});

		dispatch({
			type: types.LOGIN,
			payload: {
				user: data.user,
				token: data.token,
			},
		});
	}

	return data;
};

export const sendCode = ({
	userId,
	code,
	rememberMe,
}: {
	userId: string;
	code: string;
	rememberMe: boolean;
}): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post('/auth/login/code', {userId, code});

	if (data.success) {
		setToken({token: data.token, rememberMe});

		dispatch({
			type: types.LOGIN,
			payload: {
				user: data.user,
				token: data.token,
			},
		});
	}

	return data;
};

export const changeTwoFactorAuth = (): AppThunk => async (dispatch, getState): Promise<void> => {
	const userId = getState().auth.user._id;

	const data = await callApi.get(`/users/two_factor_auth/${userId}`);

	if (data.success) {
		dispatch({
			type: types.TWO_FACTOR_AUTH,
		});
	}
};

export const exit = (): types.AuthActionTypes => {
	removeToken();

	return {
		type: types.EXIT,
	};
};

export const verify = (): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get('/auth/verify');

	if (data.success) {
		dispatch({
			type: types.LOGIN,
			payload: {
				user: data.user,
			},
		});
	} else {
		dispatch(exit());
	}
};

export const addAvatar = (newAvatar: string): AppThunk => async (
	dispatch,
	getState,
): Promise<void> => {
	const data = await callApi.post('/users/avatar', {userId: getState().auth.user._id, newAvatar});

	if (data.success) {
		dispatch({
			type: types.ADD_AVATAR,
			payload: {
				newAvatar: data.newAvatar,
			},
		});
	}

	return data;
};

export const removeAvatar = (userId: string, image: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.post('/users/avatar/remove', {userId, image});

	if (data.success) {
		dispatch({
			type: types.REMOVE_AVATAR,
			payload: {
				image,
			},
		});
	}
};

export const replaceUser = createAction(types.REPLACE_USER, (user: IUser) => ({
	payload: {
		user,
	},
}));

export const removeUser = (userId: string): AppThunk => async (
	dispatch,
	getState,
): Promise<void> => {
	const data = await callApi.delete(`/users/${userId}`);

	if (data.success) {
		dispatch({
			type: types.REMOVE_USER,
			payload: {
				userId,
			},
		});

		if (getState().auth.user._id === userId) {
			dispatch(exit());
		}
	}
};

export const followToUser = (userId: string): AppThunk => async (
	dispatch,
	getState,
): Promise<void> => {
	const data = await callApi.post('/users/follow', {
		userId1: getState().auth.user._id,
		userId2: userId,
	});

	if (data.success) {
		dispatch({
			type: types.FOLLOW_TO_USER,
			payload: {
				userId,
			},
		});
	}
};

export const unfollowFromUser = (userId: string): AppThunk => async (
	dispatch,
	getState,
): Promise<void> => {
	const data = await callApi.post('/users/unfollow', {
		userId1: getState().auth.user._id,
		userId2: userId,
	});

	if (data.success) {
		dispatch({
			type: types.UNFOLLOW_FROM_USER,
			payload: {
				userId,
			},
		});
	}
};

export const addToBookmarks = createAction(types.ADD_TO_BOOKMARKS, articleId => ({
	payload: {
		articleId,
	},
}));
export const removeFromBookmarks = createAction(types.REMOVE_FROM_BOOKMARKS, articleId => ({
	payload: {
		articleId,
	},
}));
