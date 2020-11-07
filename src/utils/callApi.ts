import axios, {AxiosRequestConfig} from 'axios';

import {handleNetworkError} from './errorHandlers';
import {getToken} from '@utils/auth';

const request = axios.create({
	baseURL: String(process.env.REACT_APP_API),
	headers: {
		Authorization: `Bearer ${getToken()}`,
	},
});

request.interceptors.request.use(
	config => {
		config.headers.Authorization = `Bearer ${getToken()}`;

		return config;
	},
	error => handleNetworkError(error),
);

const callApi = async (endpoint: string, options?: AxiosRequestConfig): Promise<any> => {
	try {
		const {data} = await request(endpoint, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.get = async (endpoint: string, options?: AxiosRequestConfig): Promise<any> => {
	try {
		const {data} = await request.get(endpoint, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.post = async (
	endpoint: string,
	payload: object,
	options?: AxiosRequestConfig,
): Promise<any> => {
	try {
		const {data} = await request.post(endpoint, payload, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.put = async (
	endpoint: string,
	payload: object,
	options?: AxiosRequestConfig,
): Promise<any> => {
	try {
		const {data} = await request.put(endpoint, payload, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.delete = async (endpoint: string, options?: AxiosRequestConfig): Promise<any> => {
	try {
		const {data} = await request.delete(endpoint, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

export {request as axiosInstance};

export default callApi;
