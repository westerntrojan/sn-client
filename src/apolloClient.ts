import {ApolloClient, InMemoryCache} from 'apollo-boost';
import {WebSocketLink} from '@apollo/client/link/ws';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';

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

export const apolloClient = new ApolloClient({
	cache,
	link: splitLink as any,
});
