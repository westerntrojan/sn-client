import callApi from '@utils/callApi';
import {setToken, removeToken} from '@utils/auth';
import {AppThunk} from '@store/types';
import * as types from '../types';

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
