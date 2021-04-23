import {createReducer} from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.AppState = {
	loading: true,
	error: null,
	networkError: false,
	notFound: false,
	authModal: false,
};

export default createReducer(initialState, {
	[types.LOADING]: state => {
		state.loading = false;
	},
	[types.APP_ERROR]: (state, action) => {
		state.error = action.payload.error;
	},
	[types.NETWORK_ERROR]: state => {
		state.networkError = true;
	},
	[types.NOT_FOUND]: state => {
		state.notFound = true;
	},
	[types.OPEN_AUTH_MODAL]: state => {
		state.authModal = true;
	},
	[types.CLOSE_AUTH_MODAL]: state => {
		state.authModal = false;
	},
});
