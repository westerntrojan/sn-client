import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import ErrorBoundary from './components/ErrorBoundary';

import App from './App';
import Routes from './routes';
import store from './store';
import {apolloClient} from './apolloClient';
import {queryClient} from './queryClient';

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<ErrorBoundary>
						<App>
							<Routes />
						</App>
					</ErrorBoundary>
				</Router>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ApolloProvider>
	</Provider>,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept();
}

serviceWorkerRegistration.register();
