import axios from 'axios';

import {handleError, handleNotFound} from './errorHandlers';

const API = process.env.REACT_APP_API;

const callApi = async (endpoint: string, options: object = {}): Promise<any> => {
	try {
		const {data} = await axios(`${API}/${endpoint}`, options);
		if (data.error) {
			return handleError(data.error);
		}

		return data;
	} catch (error) {
		return handleError(error);
	}
};

callApi.get = async (endpoint: string): Promise<any> => {
	try {
		const {data} = await axios.get(`${API}/${endpoint}`);
		if (data.error) {
			return handleError(data.error);
		}

		return data;
	} catch (error) {
		const {status} = error.response;

		if (status === 404) {
			return handleNotFound(error);
		}

		return handleError(error);
	}
};

callApi.post = async (endpoint: string, payload: object): Promise<any> => {
	try {
		const {data} = await axios.post(`${API}/${endpoint}`, payload);
		if (data.error) {
			return handleError(data.error);
		}

		return data;
	} catch (error) {
		return handleError(error);
	}
};

callApi.put = async (endpoint: string, payload: object): Promise<any> => {
	try {
		const {data} = await axios.put(`${API}/${endpoint}`, payload);
		if (data.error) {
			return handleError(data.error);
		}

		return data;
	} catch (error) {
		return handleError(error);
	}
};

callApi.delete = async (endpoint: string, payload: object = {}): Promise<any> => {
	try {
		const {data} = await axios.delete(`${API}/${endpoint}`, payload);
		if (data.error) {
			return handleError(data.error);
		}

		return data;
	} catch (error) {
		return handleError(error);
	}
};

export default callApi;
