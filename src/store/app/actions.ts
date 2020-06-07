import {createAction} from '@reduxjs/toolkit';

import {fetchArticles} from '@store/articles/actions';
import {verify, exit} from '@store/auth/actions';
import {getCategory} from '@store/category/actions';
import {AppThunk} from '@store/types';
import * as types from './types';
import callApi from '&/utils/callApi';

export const loadApp = (): AppThunk => async (dispatch): Promise<void> => {
	await Promise.all([dispatch(fetchArticles()), dispatch(verify()), dispatch(getCategory())]);

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

export const notFound = createAction(types.NOT_FOUND);
