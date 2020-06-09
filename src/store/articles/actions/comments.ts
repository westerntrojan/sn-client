import {createAction} from '@reduxjs/toolkit';

import callApi from '@utils/callApi';
import {AppThunk} from '@store/types';
import * as types from '../types';

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
