export const LOADING = 'app/loading';
export const APP_ERROR = 'app/error';
export const NOT_FOUND = 'app/notFound';
export const REMOVE_USER = 'app/removeUser';

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
	error: object | null;
	notFound: boolean;
};
