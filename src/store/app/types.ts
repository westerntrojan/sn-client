export const LOADING = 'app/loading';
export const ERROR = 'app/error';
export const NOT_FOUND = 'app/notFound';
export const WITH_DRAWER = 'app/withDrawer';
export const NOT_DRAWER = 'app/notDrawer';
export const REMOVE_USER = 'app/removeUser';

export type AppState = {
	loading: boolean;
	error: object | null;
	notFound: boolean;
	drawer: boolean;
};
