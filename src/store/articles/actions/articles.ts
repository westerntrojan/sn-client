import callApi from '@utils/callApi';
import {AppThunk} from '@store/types';
import * as types from '../types';

export const fetchArticles = (): AppThunk => async (dispatch, getState): Promise<void> => {
	const skip = getState().articles.all.length;

	const data = await callApi.get(`/articles?skip=${skip}`);

	if (data.articles.length < 10) {
		dispatch({
			type: types.END_ARTICLES,
			payload: {
				articles: data.articles,
			},
		});
	} else {
		dispatch({
			type: types.FETCH_ARTICLES,
			payload: {
				articles: data.articles,
			},
		});
	}
};

export const getArticles = (): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get('/articles');

	dispatch({
		type: types.GET_ARTICLES,
		payload: {
			articles: data.articles,
		},
	});
};

export const getArticle = (slug: string): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get(`/articles/${slug}`);

	dispatch({
		type: types.GET_ARTICLE,
		payload: {
			article: data.article,
		},
	});
};

export const addArticle = (article: FormData): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post('/articles', article);

	if (data.article) {
		dispatch({
			type: types.ADD_ARTICLE,
			payload: {
				article: data.article,
			},
		});
	}

	return data;
};

export const editArticle = (formData: FormData): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.put(`/articles/${formData.get('articleId')}`, formData);

	if (data.article) {
		dispatch({
			type: types.EDIT_ARTICLE,
			payload: {
				article: data.article,
			},
		});
	}

	return data;
};

export const removeArticle = (articleId: string): AppThunk => async (dispatch): Promise<void> => {
	await callApi.delete(`/articles/${articleId}`);

	console.log('removeArticle');

	dispatch({
		type: types.REMOVE_ARTICLE,
		payload: {
			articleId,
		},
	});
};

export const addViews = (articleId: string): AppThunk => async (dispatch): Promise<void> => {
	await callApi.get(`/articles/views/${articleId}`);

	dispatch({
		type: types.ADD_VIEWS,
		payload: {
			articleId,
		},
	});
};

export const addLike = (articleId: string, userId: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.get(`/articles/like/${articleId}/${userId}`);

	if (data.add_like) {
		dispatch({
			type: types.ADD_LIKE,
			payload: {
				articleId,
			},
		});
	} else if (data.remove_like) {
		dispatch({
			type: types.REMOVE_LIKE,
			payload: {
				articleId,
			},
		});
	}
};
