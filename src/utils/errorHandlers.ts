import store from '../store';
import {AppActionTypes} from '@store/app/types';
import {AuthActionTypes} from '@store/auth/types';
import {appError, notFound} from '@store/app/actions';
import {exit} from '@store/auth/actions';
import {AxiosError} from 'axios';

const handle500Error = (error: AxiosError): AppActionTypes => {
	return store.dispatch(appError(error));
};

const handle404Error = (): AppActionTypes => {
	return store.dispatch(notFound());
};

const handle401Error = (): AuthActionTypes => {
	return store.dispatch(exit());
};

export const handleNetworkError = (error: AxiosError): AppActionTypes | AuthActionTypes => {
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

	return handle500Error(error);
};

export const handleAppError = (error: Error): AppActionTypes => {
	return store.dispatch(appError(error));
};
