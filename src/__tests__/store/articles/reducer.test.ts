import * as types from '@store/articles/types';
import reducer from '@store/articles/reducer';

describe('Articles Reducer Test', () => {
	it(types.FETCH_ARTICLES, () => {
		const action = {
			type: types.FETCH_ARTICLES,
			payload: {
				articles: [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}],
			},
		};

		expect(reducer(undefined, action)).toEqual({
			all: action.payload.articles,
			cache: [],
			end: false,
		});
	});

	it(types.END_ARTICLES, () => {
		const action = {
			type: types.END_ARTICLES,
			payload: {
				articles: [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}],
			},
		};

		expect(reducer(undefined, action)).toEqual({
			all: action.payload.articles,
			cache: [],
			end: true,
		});
	});
});
