import {ApolloClient, InMemoryCache} from 'apollo-boost';
import {WebSocketLink} from '@apollo/client/link/ws';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from '@apollo/client/link/context';

import {getToken} from '@utils/auth';

// cache
const cache = new InMemoryCache();

// http & ws settings
const httpLink = new HttpLink({
	uri: String(process.env.REACT_APP_GRAPHQL),
});
const wsLink = new WebSocketLink({
	uri: String(process.env.REACT_APP_GRAPHQL_WS),
	options: {
		reconnect: true,
	},
});
const splitLink = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink,
);

// get token
const authLink = setContext((_, {headers}) => {
	const token = getToken();

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const apolloClient = new ApolloClient({
	cache,
	link: authLink.concat(splitLink) as any,
});
