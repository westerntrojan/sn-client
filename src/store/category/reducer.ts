import {createReducer} from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.CategoryState = {
	all: [],
	removedCategories: [],
};

export default createReducer(initialState, {
	[types.GET_CATEGORY]: (state, action) => {
		state.all = action.payload.category;
	},
	[types.ADD_CATEGORY]: (state, action) => {
		state.all = state.all.concat(action.payload.category);
	},
	[types.EDIT_CATEGORY]: (state, action) => {
		state.all = state.all.map(category => {
			if (category._id === action.payload.category._id) {
				return action.payload.category;
			}

			return category;
		});
	},
	[types.MOVE_CATEGORY]: (state, action) => {
		const category = state.all.find(c => c._id === action.payload.categoryId);

		if (category) {
			state.all = state.all.filter(c => c._id !== action.payload.categoryId);

			state.removedCategories = state.removedCategories.concat(category);
		}
	},
	[types.RESTORE_CATEGORY]: (state, action) => {
		const category = state.removedCategories.find(c => c._id === action.payload.categoryId);

		if (category) {
			state.removedCategories = state.removedCategories.filter(
				c => c._id !== action.payload.categoryId,
			);

			state.all = state.all.concat(category);
		}
	},
	[types.REMOVE_CATEGORY]: state => {
		state.removedCategories = [];
	},
});
