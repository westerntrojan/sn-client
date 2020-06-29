import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import {AppThunk} from '@store/types';
import {IUser} from '@store/types';
import * as types from '../types';
import {exit} from './auth';

export const addAvatar = (formData: FormData): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.post('/users/avatar', formData);

	if (data.success) {
		dispatch({
			type: types.CHANGE_AVATAR,
			payload: {
				image: data.image,
			},
		});
	}

	return data;
};

export const removeAvatar = (userId: string, image: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.post('/users/avatar/remove', {userId, image});

	if (data.success) {
		dispatch({
			type: types.REMOVE_AVATAR,
			payload: {
				image,
			},
		});
	}
};

export const replaceUser = createAction(types.REPLACE_USER, (user: IUser) => ({
	payload: {
		user,
	},
}));

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
