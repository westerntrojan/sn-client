import _ from 'lodash';
import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import {AppThunk, ICategory} from '@store/types';
import * as types from './types';

export const getCategory = (): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get('/categories');

	dispatch({
		type: types.GET_CATEGORIES,
		payload: {
			categories: data.categories,
		},
	});
};

export const addCategory = (category: object): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.post('/categories', category);

	if (data.category) {
		dispatch({
			type: types.ADD_CATEGORY,
			payload: {
				category: data.category,
			},
		});
	}

	return data;
};

export const editCategory = (category: ICategory): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.put(`/categories/${category._id}`, category);

	if (data.success) {
		dispatch({
			type: types.EDIT_CATEGORY,
			payload: {
				category: data.category,
			},
		});
	}

	return data;
};

export const moveCategory = createAction(types.MOVE_CATEGORY, (categoryId: string) => ({
	payload: {
		categoryId,
	},
}));

export const restoreCategory = createAction(types.RESTORE_CATEGORY, (categoryId: string) => ({
	payload: {
		categoryId,
	},
}));

export const removeCategory = (): AppThunk => async (dispatch, getState): Promise<void> => {
	const categoriesIds = getState().category.removedCategories.map(c => c._id);

	if (!_.isEmpty(categoriesIds)) {
		await callApi.post('/categories/remove', {categoriesIds});

		dispatch({
			type: types.REMOVE_CATEGORY,
		});
	}
};
