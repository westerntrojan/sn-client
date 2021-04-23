import {QueryClient} from 'react-query';

export const queryClient = new QueryClient();

export function updateCache<T>(name: string, callback: (data: T) => T) {
	const cachedData = queryClient.getQueryData<T>(name);

	if (cachedData) {
		const updatedCache = callback(cachedData);

		queryClient.setQueryData<T>(name, updatedCache);
	}
}
