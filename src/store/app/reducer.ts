import {createReducer} from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.AppState = {
	loading: true,
	error: null,
	notFound: false,
};

export default createReducer(initialState, {
	[types.LOADING]: state => {
		state.loading = false;
	},
	[types.APP_ERROR]: (state, action) => {
		state.error = action.payload.error;
	},
	[types.NOT_FOUND]: state => {
		state.notFound = true;
	},
});
