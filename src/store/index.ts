import {configureStore, getDefaultMiddleware, combineReducers, Middleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import articlesReducer from './articles/reducer';
import categoryReducer from './category/reducer';

export const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	articles: articlesReducer,
	category: categoryReducer,
});

const getMiddleware = (): Middleware[] => {
	if (process.env.NODE_ENV === 'production') {
		return getDefaultMiddleware({
			immutableCheck: true,
			serializableCheck: false,
			thunk: true,
		});
	} else {
		return [
			...getDefaultMiddleware({
				immutableCheck: true,
				serializableCheck: false,
				thunk: true,
			}),
			logger,
		];
	}
};

export default configureStore({
	reducer: rootReducer,
	middleware: getMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
});
