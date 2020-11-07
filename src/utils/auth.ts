export const getToken = (): string => {
	const localToken = localStorage.getItem('token');
	const sessionToken = sessionStorage.getItem('token');

	return localToken ? localToken : sessionToken ? sessionToken : '';
};

export const setToken = ({token, rememberMe}: {token: string; rememberMe: boolean}): void => {
	if (rememberMe) {
		localStorage.setItem('token', token);
	} else {
		sessionStorage.setItem('token', token);
	}
};

export const removeToken = (): void => {
	localStorage.removeItem('token');
	sessionStorage.removeItem('token');
};
