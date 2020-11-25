import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import {AppThunk} from '@store/types';
import * as types from './types';

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

export const addArticle = (article: object): AppThunk => async (dispatch): Promise<object> => {
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

export const editArticle = (updatedArticle: {_id: string}): AppThunk => async (
	dispatch,
): Promise<object> => {
	const data = await callApi.put(`/articles/${updatedArticle._id}`, updatedArticle);

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

export const addView = createAction(types.ADD_VIEW, articleId => ({
	payload: {
		articleId,
	},
}));

export const addLike = createAction(types.ADD_LIKE, articleId => ({
	payload: {
		articleId,
	},
}));

export const addDislike = createAction(types.ADD_DISLIKE, articleId => ({
	payload: {
		articleId,
	},
}));

export const addComment = (newComment: object): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post('/articles/comments', newComment);

	if (data.success) {
		dispatch({
			type: types.ADD_COMMENT,
			payload: {
				comment: data.comment,
			},
		});
	}

	return data;
};

export const removeComment = (commentId: string): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.delete(`/articles/comments/${commentId}`);

	if (data.success) {
		dispatch({
			type: types.REMOVE_COMMENT,
			payload: {
				comment: data.comment,
			},
		});
	}
};

export const addReply = (newComment: object): AppThunk => async (dispatch): Promise<object> => {
	const data = await callApi.post('/articles/comments/replies', newComment);

	if (data.success) {
		dispatch({
			type: types.ADD_REPLY,
			payload: {
				reply: data.reply,
			},
		});
	}

	return data;
};

export const removeReply = (commentId: string): AppThunk => async (dispatch): Promise<void> => {
	const data = await callApi.delete(`/articles/comments/replies/${commentId}`);

	if (data.success) {
		dispatch({
			type: types.REMOVE_REPLY,
			payload: {
				reply: data.reply,
			},
		});
	}
};

export const addCommentLike = (articleId: string, commentId: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.get(`/articles/comments/like/${commentId}`);

	if (data.success) {
		dispatch({
			type: types.ADD_COMMENT_LIKE,
			payload: {
				articleId,
				commentId,
			},
		});
	}
};

export const addCommentDislike = (articleId: string, commentId: string): AppThunk => async (
	dispatch,
): Promise<void> => {
	const data = await callApi.get(`/articles/comments/dislike/${commentId}`);

	if (data.success) {
		dispatch({
			type: types.ADD_COMMENT_DISLIKE,
			payload: {
				articleId,
				commentId,
			},
		});
	}
};

export const sortCommentsByTopArticles = createAction(
	types.SORT_COMMENTS_BY_TOP_ARTICLES,
	(articleId: string) => ({payload: {articleId}}),
);

export const sortCommentsByNewestFirst = createAction(
	types.SORT_COMMENTS_BY_NEWEST_FIRST,
	(articleId: string) => ({payload: {articleId}}),
);
