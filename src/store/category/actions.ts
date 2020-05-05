import _ from 'lodash';
import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import * as types from './types';
import {AppThunk, ICategory} from '@store/types';

const API = '/category';

export const getCategory = (): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get(API);

	dispatch({
		type: types.GET_CATEGORY,
		payload: {
			category: data.category,
		},
	});
};

export const addCategory = (category: object): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.post(API, category);

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
	const data = await callApi.put(`${API}/${category._id}`, category);

	if (data.category) {
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
	const categories = getState().category.removedCategories.map(c => c._id);

	if (!_.isEmpty(categories)) {
		await callApi.post(`${API}/remove`, {categories});

		dispatch({
			type: types.REMOVE_CATEGORY,
			payload: {
				categories,
			},
		});
	}
};
