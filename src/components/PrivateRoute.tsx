import React, {useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useHistory} from 'react-router';
import {Location} from 'history';

type Props = {
	children?: React.ReactNode;
	condition: boolean;
	redirectTo: string;
	path: string;
	exact?: boolean;
};

const PrivateRoute: React.FC<Props> = ({children, condition, redirectTo, ...rest}) => {
	const history: any = useHistory();

	useEffect(() => {
		const from = history.location.state && history.location.state.from.pathname;

		if (from) {
			const pathname = history.location.state.from.pathname.split('/').reverse()[1];

			if (pathname === 'verify') {
				const state = {
					from: {
						pathname: '/',
					},
				};

				history.replace({...history.location, state});
			}
		}

		console.log(history.location.state);
	}, [history]);

	return (
		<Route
			{...rest}
			render={(props: {location: Location}): React.ReactNode =>
				condition ? (
					children
				) : (
					<Redirect to={{pathname: redirectTo, state: {from: props.location}}} />
				)
			}
		/>
	);
};

export default PrivateRoute;
