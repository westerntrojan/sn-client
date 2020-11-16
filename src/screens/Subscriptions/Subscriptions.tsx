import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import {RootState} from '@store/types';
import AuthSubscriptions from './components/AuthSubscriptions';
import NotAuthSubscriptions from './components/NotAuthSubscriptions';

const Subscriptions: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth, shallowEqual);

	return (
		<section className='subscriptions'>
			<Helmet>
				<title>Subscriptions / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{isAuth ? <AuthSubscriptions /> : <NotAuthSubscriptions />}
		</section>
	);
};

export default Subscriptions;
