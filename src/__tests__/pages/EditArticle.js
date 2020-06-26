import React from 'react';
import {shallow} from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import EditArticle from '&/pages/EditArticle';
import {getArticle} from '&/store/articles/actions';

const setup = () => {
	const initialState = {
		articles: {
			articles: [{_id: 1, title: 'Some title', text: 'Some text', image: ''}],
			article: null,
		},
	};

	const mockStore = configureMockStore([thunk]);
	const store = mockStore(initialState);

	const wrapper = shallow(<EditArticle store={store} />);

	return {
		initialState,
		store,
		wrapper,
	};
};

describe('EditArticle', () => {
	it('render component', () => {
		const {initialState, store, wrapper} = setup();

		store.dispatch(getArticle(1));
		expect(wrapper.prop('article')).toEqual(initialState.articles[0]);
	});
});
