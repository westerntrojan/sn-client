import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';

import * as types from '&/store/constants/types';
import * as actions from '&/store/articles/actions';

const API = `${process.env.REACT_APP_API}/articles`;
const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

describe('articles actions', () => {
	afterEach(() => {
		mock.reset();
	});

	it('GET_ARTICLES', () => {
		const data = {articles: [{_id: 1}, {_id: 2}, {_id: 3}]};
		mock.onGet(API).reply(200, data);
		const store = mockStore({});

		const expectedActions = [
			{
				type: types.articles.GET_ARTICLES,
				payload: {
					articles: data.articles,
				},
			},
		];

		return store.dispatch(actions.getArticles()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('ADD_ARTICLE', () => {
		const article = {
			title: 'some title',
			text: 'some text',
		};
		const data = {article: {_id: 1, ...article}};
		mock.onPost(API).reply(200, data);
		const store = mockStore({});

		const expectedActions = [
			{
				type: types.articles.ADD_ARTICLE,
				payload: {
					article: data.article,
				},
			},
		];

		return store.dispatch(actions.addArticle(article)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('GET_ARTICLE', () => {
		const store = mockStore({});

		const articleId = 1;
		const expectedActions = [
			{
				type: types.articles.GET_ARTICLE,
				payload: {
					articleId,
				},
			},
		];

		return store.dispatch(actions.getArticle(articleId)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('EDIT_ARTICLE', () => {
		const article = {
			_id: 1,
			title: 'some title',
			text: 'some text',
		};
		const data = {article: {_id: 1, ...article}};
		mock.onPut(`${API}/${article._id}`).reply(200, data);
		const store = mockStore({});

		const expectedActions = [
			{
				type: types.articles.EDIT_ARTICLE,
				payload: {
					article: data.article,
				},
			},
		];

		return store.dispatch(actions.editArticle(article)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('REMOVE_ARTICLE', () => {
		const articleId = 1;
		mock.onDelete(`${API}/${articleId}`).reply(200);
		const store = mockStore({});

		const expectedActions = [
			{
				type: types.articles.REMOVE_ARTICLE,
				payload: {
					articleId,
				},
			},
		];

		return store.dispatch(actions.removeArticle(articleId)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
