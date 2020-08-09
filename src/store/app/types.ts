export const LOADING = 'app/loading';
export const PRE_LOADING = 'app/preLoading';
export const APP_ERROR = 'app/error';
export const NOT_FOUND = 'app/notFound';
export const RESET_APP = 'app/reset';

type NotFound = {
	type: typeof NOT_FOUND;
};
type AppError = {
	type: typeof APP_ERROR;
	payload: {
		error: object;
	};
};

export type AppActionTypes = NotFound | AppError;

export type AppState = {
	loading: boolean;
	preLoading: boolean;
	error: object | null;
	notFound: boolean;
};
