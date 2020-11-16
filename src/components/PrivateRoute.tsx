import React from 'react';
import {Route} from 'react-router-dom';
import {Location} from 'history';

import NotFound from '@components/common/NotFound';

type Props = {
	children: React.ReactNode;
	condition: boolean;
	redirectTo: string;
	path: string;
	exact?: boolean;
};

const PrivateRoute: React.FC<Props> = ({children, condition, redirectTo, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props: {location: Location}): React.ReactNode =>
				condition ? children : <NotFound />
			}
		/>
	);
};

export default PrivateRoute;
