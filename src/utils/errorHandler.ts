import store from '../store';
import {ERROR} from '@store/app/types';

type AppError = {
	type: string;
	payload: {
		error: object;
	};
};

export default (error: Error): AppError => {
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
