export const LOADING = 'app/loading';
export const PRE_LOADING = 'app/preLoading';
export const APP_ERROR = 'app/error';
export const NETWORK_ERROR = 'app/networkError';
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
type NetworkError = {
	type: typeof NETWORK_ERROR;
};

export type AppActionTypes = NotFound | AppError | NetworkError;

export type AppState = {
	loading: boolean;
	error: object | null;
	networkError: boolean;
	notFound: boolean;
	authModal: boolean;
};
