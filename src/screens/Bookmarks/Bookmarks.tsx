import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import {RootState} from '@/store/types';
import AuthBookmarks from './AuthBookmarks';
import NotAuthBookmarks from './NotAuthBookmarks';

const Bookmarks: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth, shallowEqual);

	return (
		<section className='bookmarks'>
			<Helmet>
				<title>Bookmarks / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{isAuth ? <AuthBookmarks /> : <NotAuthBookmarks />}
		</section>
	);
};

export default Bookmarks;
