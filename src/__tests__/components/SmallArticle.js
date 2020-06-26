import React from 'react';
import {shallow} from 'enzyme';

import SmallArticle from '&/pages/Main/components/SmallArticle';

const setup = () => {
	const props = {
		article: {
			_id: '123',
			title: 'Some title',
			text: 'Some text',
			comments: [{_id: 1}, {_id: 2}, {_id: 3}],
			views: 4,
		},
	};

	const wrapper = shallow(<SmallArticle {...props} />);

	return {
		wrapper,
		props,
	};
};

describe('SmallArticle', () => {
	it('should render self and subcomponents', () => {
		const {wrapper} = setup();

		expect(wrapper.find('article').hasClass('main-article')).toBe(true);
		expect(wrapper.find('.fa-eye')).toHaveLength(1);
		expect(wrapper.find('.fa-comments')).toHaveLength(1);
	});
});
