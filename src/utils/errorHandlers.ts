import store from '../store';
import {appError, notFound, newtworkError} from '@/store/app/actions';
import {exit} from '@/store/auth/actions';
import {AxiosError} from 'axios';

const handle500Error = () => {
	return store.dispatch(newtworkError());
};

const handle404Error = () => {
	return store.dispatch(notFound());
};

const handle401Error = () => {
	return store.dispatch(exit());
};

export const handleNetworkError = (error: AxiosError) => {
	if (process.env.NODE_ENV !== 'production') {
		console.error(error);
	}

	if (error.response) {
		const {status} = error.response;

		if (status === 404) {
			return handle404Error();
		}

		if (status === 401) {
			return handle401Error();
		}
	}

	return handle500Error();
};

export const handleAppError = (error: Error) => {
	return store.dispatch(appError(error));
};
