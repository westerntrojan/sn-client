export const LOADING = 'app/loading';
export const PRE_LOADING = 'app/preLoading';
export const APP_ERROR = 'app/error';
export const NOT_FOUND = 'app/notFound';
export const RESET_APP = 'app/reset';
export const OPEN_AUTH_MODAL = 'app/openAuthModal';
export const CLOSE_AUTH_MODAL = 'app/closeAuthModal';
export const OPENING_MODAL = 'app/openingModal';
export const CLOSING_MODAL = 'app/closingModal';

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
	authModal: boolean;
};
