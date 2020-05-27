import {createAction} from '@reduxjs/toolkit';

import {fetchArticles} from '@store/articles/actions';
import {verify, exit} from '@store/auth/actions';
import {getCategory} from '@store/category/actions';
import {AppThunk} from '@store/types';
import callApi from '@utils/callApi';
import * as types from './types';

export const loadApp = (): AppThunk => async (dispatch): Promise<void> => {
	await Promise.all([dispatch(fetchArticles()), dispatch(verify()), dispatch(getCategory())]);

	dispatch({
		type: types.LOADING,
	});
};

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

export const appError = createAction(types.APP_ERROR, (error: Error) => ({
	payload: {
		error,
	},
}));

export const notFound = createAction(types.NOT_FOUND);
