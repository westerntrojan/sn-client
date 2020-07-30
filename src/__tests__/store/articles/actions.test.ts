import configureMockStore from 'redux-mock-store';
import {AnyAction} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import * as types from '@store/articles/types';
import * as actions from '@store/articles/actions';
import {axiosInstance} from '@utils/callApi';
import {RootState} from '@store/types';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

// mock axios instance
const mock = new MockAdapter(axiosInstance);

// mock store
const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

const API = `${process.env.REACT_APP_API}/articles`;

describe('Articles Actions Test', () => {
	afterEach(() => {
		mock.reset();
	});

	it(actions.getArticles.name, async () => {
		const articles = [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}];

		mock.onGet(API).reply(200, {
			articles,
		});

		const expectedAction = {
			type: types.GET_ARTICLES,
			payload: {
				articles,
			},
		};

		const store = mockStore();

		await store.dispatch(actions.getArticles() as any);

		expect(store.getActions()[0]).toEqual(expectedAction);
	});

	it(actions.getArticle.name, async () => {
		const slug = 'some-slug';
		const article = {_id: 1};

		mock.onGet(`${API}/${slug}`).reply(200, {
			article,
		});

		const expectedAction = {
			type: types.GET_ARTICLE,
			payload: {
				article,
			},
		};

		const store = mockStore();

		await store.dispatch(actions.getArticle(slug) as any);

		expect(store.getActions()[0]).toEqual(expectedAction);
	});
});
