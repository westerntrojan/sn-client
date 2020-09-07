import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import Routes from './routes';
import store from './store';
import {apolloClient} from './apolloClient';

if (process.env.NODE_ENV === 'production') {
	Sentry.init({dsn: 'https://42a70964b139445a9f9f2e4e59993747@sentry.io/5167390'});
}

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<Router>
				<ErrorBoundary>
					<App>
						<Routes />
					</App>
				</ErrorBoundary>
			</Router>
		</ApolloProvider>
	</Provider>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept();
}

serviceWorker.register();
