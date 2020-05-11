import store from '../store';
import {ERROR, NOT_FOUND} from '@store/app/types';

type AppError = {
	type: string;
	payload: {
		error: object;
	};
};

export const handleError = (error: Error): AppError => {
	if (process.env.NODE_ENV !== 'production') {
		console.error(error);
	}

	return store.dispatch({
		type: ERROR,
		payload: {
			error,
		},
	});
};

export const handleNotFound = (error: Error): AppError => {
	if (process.env.NODE_ENV !== 'production') {
		console.error(error);
	}

	return store.dispatch({
		type: NOT_FOUND,
		payload: {
			error,
		},
	});
};
