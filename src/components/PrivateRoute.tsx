import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Location} from 'history';

type Props = {
	children: React.ReactNode;
	condition: boolean;
	redirectTo: string;
	path: string;
};

const PrivateRoute: React.FC<Props> = ({children, condition, redirectTo, ...rest}) => {
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
