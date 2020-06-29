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

	if (data.success) {
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

	if (data.success) {
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

export const addLike = (articleId: string): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get(`/articles/like/${articleId}`);

	if (data.success) {
		dispatch({
			type: types.ADD_LIKE,
			payload: {
				articleId,
			},
		});
	}
};

export const addDislike = (articleId: string): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.get(`/articles/dislike/${articleId}`);

	if (data.success) {
		dispatch({
			type: types.ADD_DISLIKE,
			payload: {
				articleId,
			},
		});
	}
};

export const addToBookmars = (articleId: string, userId: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.get(`/articles/bookmarks/${articleId}/${userId}`);

	if (data.success) {
		if (data.added) {
			dispatch({
				type: types.ADD_TO_BOOKMARKS,
				payload: {
					articleId,
				},
			});
		} else if (data.removed) {
			dispatch({
				type: types.REMOVE_FROM_BOOKMARKS,
				payload: {
					articleId,
				},
			});
		}
	}
};
