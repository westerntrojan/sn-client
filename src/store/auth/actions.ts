import callApi from '@utils/callApi';
import {AppThunk} from '@store/types';
import * as types from './types';

export const login = (user: object): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post('/auth/login', user);

	if (data.success) {
		localStorage.setItem('token', data.token);

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

export const sendCode = (userId: string, code: string): AppThunk => async (
	dispatch,
): Promise<object> => {
	const data = await callApi.post('/auth/login/code', {userId, code});

	console.log(data);

	if (data.success) {
		localStorage.setItem('token', data.token);

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

export const exit = (): types.AuthActionTypes => {
	localStorage.removeItem('token');

	return {
		type: types.EXIT,
	};
};

export const verify = (): AppThunk => async (dispatch): Promise<void> => {
	const token = localStorage.getItem('token');

	if (token) {
		const data = await callApi.get('/auth/verify', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (data.success) {
			dispatch({
				type: types.LOGIN,
				payload: {
					user: data.user,
				},
			});
		}
	}
};

export const addAvatar = (formData: FormData): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.post('/users/avatar', formData);

	if (data.errors) {
		return data.errors[0];
	}

	dispatch({
		type: types.CHANGE_AVATAR,
		payload: {
			image: data.image,
		},
	});
};

export const removeAvatar = (userId: string, imageUrl: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.post('/users/avatar/remove', {userId, imageUrl});

	if (data.image) {
		dispatch({
			type: types.REMOVE_AVATAR,
			payload: {
				image: data.image,
			},
		});
	}
};

export const twoFactorAuth = (): AppThunk => async (dispatch, getState): Promise<void> => {
	const userId = getState().auth.user._id;

	const data = await callApi.get(`/users/two_factor_auth/${userId}`);

	if (data.success) {
		dispatch({
			type: types.TWO_FACTOR_AUTH,
		});
	}
};
