import {createAction} from '@reduxjs/toolkit';

import {verify, exit} from '@/store/auth/actions';
import {AppThunk} from '@/store/types';
import * as types from './types';
import callApi from '@/utils/callApi';

export const loadApp = (): AppThunk => async (dispatch): Promise<void> => {
	await Promise.all([dispatch(verify())]);

	dispatch({
		type: types.LOADING,
	});
};

export const resetApp = (): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get('/app/reset');

	if (data.success) {
		dispatch(exit());

		dispatch({
			type: types.RESET_APP,
			payload: {
				categories: data.categories,
			},
		});
	}
};

export const appError = createAction(types.APP_ERROR, (error: Error) => ({
	payload: {
		error,
	},
}));

export const newtworkError = createAction(types.NETWORK_ERROR);

export const notFound = createAction(types.NOT_FOUND);

export const openAuthModal = createAction(types.OPEN_AUTH_MODAL);

export const closeAuthModal = createAction(types.CLOSE_AUTH_MODAL);
