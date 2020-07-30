import React from 'react';
import {mount} from 'enzyme';
import configureMockStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/core/styles';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {BrowserRouter as Router} from 'react-router-dom';

import Home from '@pages/Home';
import {getCurrentTheme} from '@utils/app';
import Context from '@App/context';
import {defaultUser} from '@store/auth/types';
import SmallArticle from '@components/SmallArticle';

const getArticles = (count: number): any[] => {
	let _id = 0;

	const defaultArticle = {
		title: 'some-title',
		text: 'some-text',
		user: {...defaultUser, username: 'some-username', firstName: 'Jack'},
		comments: [],
		created: Date.now(),
	};

	const articles = [];

	for (let i = 0; i < count; i++) {
		articles.push({_id: _id.toString(), ...defaultArticle});

		_id++;
	}

	return articles;
};

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
	app: {
		loading: false,
	},
	articles: {
		all: [],
		end: true,
	},
});

type Props = {
	children: React.ReactNode;
	store?: MockStore;
};

const Wrapper: React.FC<Props> = ({children, store}) => {
	const theme = getCurrentTheme();

	return (
		<Provider store={store ? store : defaultStore}>
			<Router>
				<ThemeProvider theme={theme}>
					<Context.Provider value={{topTags: [], loadingData: true}}>{children}</Context.Provider>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

describe(`${Home.name} Page Test`, () => {
	it(`${Home.name} without articles`, () => {
		const component = mount(
			<Wrapper>
				<Home />
			</Wrapper>,
		);

		expect(component.find('div.no-info')).toHaveLength(1);
		expect(component.find(SmallArticle)).toHaveLength(0);
	});

	it(`${Home.name} with bottom loading`, () => {
		const store = mockStore({
			app: {
				loading: false,
			},
			articles: {
				all: [],
				end: false,
			},
		});

		const component = mount(
			<Wrapper store={store}>
				<Home />
			</Wrapper>,
		);

		expect(component.find(BottomScrollListener)).toHaveLength(1);
	});

	it(`${Home.name} with articles`, () => {
		const store = mockStore({
			auth: {
				user: {
					bookmarks: [],
				},
			},
			app: {
				loading: false,
			},
			articles: {
				all: getArticles(4),
				end: true,
			},
		});

		const component = mount(
			<Wrapper store={store}>
				<Home />
			</Wrapper>,
		);

		expect(component.find('div.no-info')).toHaveLength(0);
		expect(component.find(SmallArticle)).toHaveLength(4);
	});
});
