import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import {RootState} from '@/store/types';
import AuthFeed from './AuthFeed';
import NotAuthFeed from './NotAuthFeed';

const Feed: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth, shallowEqual);

	return (
		<section className='feed'>
			<Helmet>
				<title>Feed / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{isAuth ? <AuthFeed /> : <NotAuthFeed />}
		</section>
	);
};

export default Feed;
