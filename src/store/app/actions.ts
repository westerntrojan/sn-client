import {createAction} from '@reduxjs/toolkit';

import {fetchArticles} from '@store/articles/actions';
import {verify} from '@store/auth/actions';
import {getCategory} from '@store/category/actions';
import {AppThunk} from '@store/types';
import * as types from './types';

export const loadApp = (): AppThunk => async (dispatch): Promise<void> => {
	await Promise.all([dispatch(fetchArticles()), dispatch(verify()), dispatch(getCategory())]);

	dispatch({
		type: types.LOADING,
	});
};

export const appError = createAction(types.APP_ERROR, (error: Error) => ({
	payload: {
		error,
	},
}));

export const notFound = createAction(types.NOT_FOUND);
