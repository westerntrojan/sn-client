import * as types from '&/store/constants/types';
import initialState from '&/store/constants/initialState';
import reducer from '&/store/articles/reducer';

describe('articles reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState.articles);
	});

	it('GET_ARTICLES', () => {
		const action = {
			type: types.articles.GET_ARTICLES,
			payload: {
				articles: [{_id: 1}, {_id: 2}, {_id: 3}],
			},
		};

		expect(reducer(initialState.articles, action)).toEqual({
			...initialState.articles,
			articles: action.payload.articles,
			article: null,
		});
	});

	it('ADD_ARTICLE', () => {
		const initialState = {
			articles: [{_id: 1}, {_id: 2}],
			article: null,
		};

		const action = {
			type: types.articles.ADD_ARTICLE,
			payload: {
				article: {_id: 3},
			},
		};

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			articles: [{_id: 3}, {_id: 1}, {_id: 2}],
			article: null,
		});
	});

	it('GET_ARTICLE', () => {
		const initialState = {
			articles: [{_id: 1}, {_id: 2}, {_id: 3}],
			article: null,
		};

		const action = {
			type: types.articles.GET_ARTICLE,
			payload: {
				articleId: 1,
			},
		};

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			articles: initialState.articles,
			article: initialState.articles[0],
		});
	});

	it('EDIT_ARTICLE', () => {
		const initialState = {
			articles: [
				{_id: 1, title: '1'},
				{_id: 2, title: '2'},
				{_id: 3, title: '3'},
			],
			article: null,
		};

		const action = {
			type: types.articles.EDIT_ARTICLE,
			payload: {
				article: {
					_id: 3,
					title: '4',
				},
			},
		};

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			article: action.payload.article,
			articles: [
				{_id: 1, title: '1'},
				{_id: 2, title: '2'},
				{_id: 3, title: '4'},
			],
		});
	});

	it('REMOVE_ARTICLE', () => {
		const initialState = {
			articles: [{_id: 1}, {_id: 2}, {_id: 3}],
			article: null,
		};

		const action = {
			type: types.articles.REMOVE_ARTICLE,
			payload: {
				articleId: 1,
			},
		};

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			articles: [{_id: 2}, {_id: 3}],
			article: null,
		});
	});
});
