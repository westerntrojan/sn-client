import {createReducer} from '@reduxjs/toolkit';
import _ from 'lodash';

import {RESET_APP} from '@store/app/types';
import {REMOVE_CATEGORY, EDIT_CATEGORY} from '@store/category/types';
import * as types from './types';

const initialState: types.ArticlesState = {
	all: [],
	cache: [],
	end: false,
};

export default createReducer(initialState, {
	[types.FETCH_ARTICLES]: (state, action) => {
		state.all = state.all.concat(action.payload.articles);
	},
	[types.END_ARTICLES]: (state, action) => {
		state.all = state.all.concat(action.payload.articles);
		state.end = true;
	},
	[types.GET_ARTICLES]: (state, action) => {
		state.all = action.payload.articles;
		state.end = action.payload.articles.length < 10;
		state.cache = [];
	},
	[types.GET_ARTICLE]: (state, action) => {
		state.cache = state.cache.concat(action.payload.article);
	},
	[types.ADD_ARTICLE]: (state, action) => {
		state.all = [action.payload.article, ...state.all];
	},
	[types.EDIT_ARTICLE]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.article._id) {
				return action.payload.article;
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.article._id) {
				return action.payload.article;
			}

			return article;
		});
	},
	[types.REMOVE_ARTICLE]: (state, action) => {
		state.all = state.all.filter(article => article._id !== action.payload.articleId);
		state.cache = state.cache.filter(article => article._id !== action.payload.articleId);
	},
	[types.ADD_LIKE]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, likes: article.likes + 1};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, likes: article.likes + 1};
			}

			return article;
		});
	},
	[types.ADD_DISLIKE]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, dislikes: article.dislikes + 1};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, dislikes: article.dislikes + 1};
			}

			return article;
		});
	},
	[types.ADD_VIEW]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, views: article.views + 1};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				return {...article, views: article.views + 1};
			}

			return article;
		});
	},
	[types.ADD_COMMENT]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.comment.articleId) {
				return {
					...article,
					comments: [action.payload.comment, ...article.comments],
				};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.comment.articleId) {
				return {
					...article,
					comments: [action.payload.comment, ...article.comments],
				};
			}

			return article;
		});
	},
	[types.REMOVE_COMMENT]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.comment.articleId) {
				return {
					...article,
					comments: article.comments.filter(comment => comment._id !== action.payload.comment._id),
				};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.comment.articleId) {
				return {
					...article,
					comments: article.comments.filter(comment => comment._id !== action.payload.comment._id),
				};
			}

			return article;
		});
	},
	[types.ADD_REPLY]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.reply.articleId) {
				const comments = article.comments.map(comment => {
					if (comment._id === action.payload.reply.parentId) {
						comment.replies.push(action.payload.reply);

						return comment;
					}

					return comment;
				});

				return {
					...article,
					comments,
				};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.reply.articleId) {
				const comments = article.comments.map(comment => {
					if (comment._id === action.payload.reply.parentId) {
						comment.replies.push(action.payload.reply);

						return comment;
					}

					return comment;
				});

				return {
					...article,
					comments,
				};
			}

			return article;
		});
	},
	[types.REMOVE_REPLY]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.reply.articleId) {
				const comments = article.comments.map(comment => {
					if (comment._id === action.payload.reply.parentId) {
						return {
							...comment,
							replies: comment.replies.filter(reply => reply._id !== action.payload.reply._id),
						};
					}

					return comment;
				});

				return {
					...article,
					comments,
				};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.reply.articleId) {
				const comments = article.comments.map(comment => {
					if (comment._id === action.payload.reply.parentId) {
						return {
							...comment,
							replies: comment.replies.filter(reply => reply._id !== action.payload.reply._id),
						};
					}

					return comment;
				});

				return {
					...article,
					comments,
				};
			}

			return article;
		});
	},
	[EDIT_CATEGORY]: (state, action) => {
		state.all = state.all.map(article => {
			if (article.category._id === action.payload.category._id) {
				return {...article, category: action.payload.category};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article.category._id === action.payload.category._id) {
				return {...article, category: action.payload.category};
			}

			return article;
		});
	},
	[REMOVE_CATEGORY]: (state, action) => {
		state.all = state.all.filter(
			article => !action.payload.categories.includes(article.category._id),
		);
		state.cache = state.cache.filter(
			article => !action.payload.categories.includes(article.category._id),
		);
	},
	[types.ADD_COMMENT_LIKE]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				article.comments.forEach(comment => {
					if (comment._id === action.payload.commentId) {
						comment.likes = comment.likes + 1;
					}

					comment.replies.forEach(reply => {
						if (reply._id === action.payload.commentId) {
							reply.likes = reply.likes + 1;
						}
					});
				});
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				article.comments.forEach(comment => {
					if (comment._id === action.payload.commentId) {
						comment.likes = comment.likes + 1;
					}

					comment.replies.forEach(reply => {
						if (reply._id === action.payload.commentId) {
							reply.likes = reply.likes + 1;
						}
					});
				});
			}

			return article;
		});
	},
	[types.ADD_COMMENT_DISLIKE]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				article.comments.forEach(comment => {
					if (comment._id === action.payload.commentId) {
						comment.dislikes = comment.dislikes + 1;
					}
				});
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				article.comments.forEach(comment => {
					if (comment._id === action.payload.commentId) {
						comment.dislikes = comment.dislikes + 1;
					}
				});
			}

			return article;
		});
	},
	[types.SORT_COMMENTS_BY_TOP_ARTICLES]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				const comments = _.orderBy(article.comments, 'likes', 'desc');

				return {...article, comments};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				const comments = _.orderBy(article.comments, 'likes', 'desc');

				return {...article, comments};
			}

			return article;
		});
	},
	[types.SORT_COMMENTS_BY_NEWEST_FIRST]: (state, action) => {
		state.all = state.all.map(article => {
			if (article._id === action.payload.articleId) {
				const comments = _.orderBy(article.comments, 'created', 'desc');

				return {...article, comments};
			}

			return article;
		});
		state.cache = state.cache.map(article => {
			if (article._id === action.payload.articleId) {
				const comments = _.orderBy(article.comments, 'created', 'desc');

				return {...article, comments};
			}

			return article;
		});
	},
	[RESET_APP]: state => {
		state.all = [];
		state.cache = [];
		state.end = true;
	},
});
