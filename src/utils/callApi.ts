import axios from 'axios';

import errorHandler from './errorHandler';

const API = process.env.REACT_APP_API;

const callApi = async (endpoint: string, options: object = {}): Promise<any> => {
	try {
		const {data} = await axios(`${API}/${endpoint}`, options);
		if (data.error) {
			return errorHandler(data.error);
		}

		return data;
	} catch (error) {
		return errorHandler(error);
	}
};

callApi.get = async (endpoint: string): Promise<any> => {
	try {
		const {data} = await axios.get(`${API}/${endpoint}`);
		if (data.error) {
			return errorHandler(data.error);
		}

		return data;
	} catch (error) {
		return errorHandler(error);
	}
};

callApi.post = async (endpoint: string, payload: object): Promise<any> => {
	try {
		const {data} = await axios.post(`${API}/${endpoint}`, payload);
		if (data.error) {
			return errorHandler(data.error);
		}

		return data;
	} catch (error) {
		return errorHandler(error);
	}
};

callApi.put = async (endpoint: string, payload: object): Promise<any> => {
	try {
		const {data} = await axios.put(`${API}/${endpoint}`, payload);
		if (data.error) {
			return errorHandler(data.error);
		}

		return data;
	} catch (error) {
		return errorHandler(error);
	}
};

callApi.delete = async (endpoint: string, payload: object = {}): Promise<any> => {
	try {
		const {data} = await axios.delete(`${API}/${endpoint}`, payload);
		if (data.error) {
			return errorHandler(data.error);
		}

		return data;
	} catch (error) {
		return errorHandler(error);
	}
};

export default callApi;
