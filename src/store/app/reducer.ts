import {createReducer} from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.AppState = {
	loading: true,
	error: null,
	notFound: false,
	drawer: true,
};

export default createReducer(initialState, {
	[types.LOADING]: state => {
		state.loading = false;
	},
	[types.ERROR]: (state, action) => {
		state.error = action.payload.error;
	},
	[types.NOT_FOUND]: state => {
		state.notFound = true;
	},
	[types.WITH_DRAWER]: state => {
		state.drawer = true;
	},
	[types.NOT_DRAWER]: state => {
		state.drawer = false;
	},
});
