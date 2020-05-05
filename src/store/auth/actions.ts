import callApi from '@utils/callApi';
import * as types from './types';
import {AppThunk} from '@store/types';

const API = '/auth';

export const login = (user: object): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post(`${API}/login`, user);

	if (data.user) {
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

export const register = (user: object): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post(`${API}/register`, user);

	if (data.user) {
		localStorage.setItem('token', data.token);

		dispatch({
			type: types.REGISTER,
			payload: {
				user: data.user,
				token: data.token,
			},
		});
	}

	return data;
};

export const exit = (): AppThunk => async (dispatch): Promise<void> => {
	const token = localStorage.getItem('token');

	if (token) {
		await callApi.get(`${API}/logout/${token}`);

		localStorage.removeItem('token');
	}

	dispatch({
		type: types.EXIT,
	});
};

export const verify = (): AppThunk => async (dispatch): Promise<void> => {
	const token = localStorage.getItem('token');

	if (token) {
		const data = await callApi.get(`${API}/verify/${token}`);

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
	} else {
		dispatch(exit());
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
