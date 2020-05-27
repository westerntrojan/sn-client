import axios from 'axios';

import {handleNetworkError} from './errorHandlers';

const callApi = async (endpoint: string, options: object = {}): Promise<any> => {
	try {
		const {data} = await axios(`${process.env.REACT_APP_API}/${endpoint}`, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.get = async (endpoint: string, options: object = {}): Promise<any> => {
	try {
		const {data} = await axios.get(`${process.env.REACT_APP_API}/${endpoint}`, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.post = async (
	endpoint: string,
	payload: object = {},
	options: object = {},
): Promise<any> => {
	try {
		const {data} = await axios.post(`${process.env.REACT_APP_API}/${endpoint}`, payload, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.put = async (
	endpoint: string,
	payload: object = {},
	options: object = {},
): Promise<any> => {
	try {
		const {data} = await axios.put(`${process.env.REACT_APP_API}/${endpoint}`, payload, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

callApi.delete = async (endpoint: string, options: object = {}): Promise<any> => {
	try {
		const {data} = await axios.delete(`${process.env.REACT_APP_API}/${endpoint}`, options);

		return data;
	} catch (error) {
		return handleNetworkError(error);
	}
};

export default callApi;

// --------------------------------------------------------------------------------------
// const identity = <T>(arg: Array<T>): Array<T> => {
// 	return arg;
// };

// const result = identity<number>([1, 2, 3]);
// console.log(result.length);

// function getBy<T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null {
// 	return model.filter(item => item[prop] === value)[0] || null;
// }
// --------------------------------------------------------------------------------------
// const result = getBy(students, 'age', '17');
// // Error: Argument of type '"17"' is not assignable to parameter of type 'number'.

// const anotherResult = getBy(students, 'hasScar', 'true');
// // Error: Argument of type '"true"' is not assignable to parameter of type 'boolean'.

// const yetAnotherResult = getBy(students, 'name', 'Harry');
// // А тут уже всё правильно
// --------------------------------------------------------------------------------------
// callApi.get = async <ReturningData>(
// 	endpoint: string,
// 	options: object = {},
// ): Promise<ReturningData> => {
// 	const {data} = await axios.get(`${process.env.REACT_APP_API}/${endpoint}`, options);

// 	return data;
// };
// --------------------------------------------------------------------------------------
