import React, {Suspense, lazy} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PageLoader from './components/PageLoader';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/common/NotFound';
import {RootState} from '@store/types';
import Home from './screens/Home';

const AddArticle = lazy(() => import('./screens/AddArticle'));
const Article = lazy(() => import('./screens/Article'));
const EditArticle = lazy(() => import('./screens/EditArticle'));
const EditUser = lazy(() => import('./screens/EditUser'));
const User = lazy(() => import('./screens/User'));
const Admin = lazy(() => import('./screens/Admin'));
const GlobalChat = lazy(() => import('./screens/GlobalChat'));
const Direct = lazy(() => import('./screens/Direct'));
const DirectChat = lazy(() => import('./screens/DirectChat'));
const Group = lazy(() => import('./screens/Group'));
const GroupChat = lazy(() => import('./screens/GroupChat'));
const Category = lazy(() => import('./screens/Category'));
const Tag = lazy(() => import('./screens/Tag'));
const RegisterVerify = lazy(() => import('./screens/RegisterVerify'));
const PasswordResetVerify = lazy(() => import('./screens/PasswordResetVerify'));
const Feed = lazy(() => import('./screens/Feed'));
const Bookmarks = lazy(() => import('./screens/Bookmarks'));

const Routes: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const appPreLoading = useSelector((state: RootState) => state.app.preLoading, shallowEqual);

	if (appPreLoading) {
		return <PageLoader />;
	}

	return (
		<Suspense fallback={<PageLoader />}>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/user/:userLink'>
					<User />
				</Route>
				<PrivateRoute path='/article/add' condition={auth.isAuth}>
					<AddArticle />
				</PrivateRoute>
				<Route exact path='/article/:slug'>
					<Article />
				</Route>

				<Route path='/global'>
					<GlobalChat />
				</Route>
				<Route path='/category/:slug'>
					<Category />
				</Route>
				<Route path='/tag/:slug'>
					<Tag />
				</Route>

				<Route path='/feed'>
					<Feed />
				</Route>
				<Route path='/bookmarks'>
					<Bookmarks />
				</Route>

				<PrivateRoute path='/article/:slug/edit' condition={auth.isAuth}>
					<EditArticle />
				</PrivateRoute>
				<PrivateRoute path='/user/:userLink/edit' condition={auth.isAuth}>
					<EditUser />
				</PrivateRoute>
				<PrivateRoute path='/direct' condition={auth.isAuth} exact>
					<Direct />
				</PrivateRoute>
				<PrivateRoute path='/direct/:chatId' condition={auth.isAuth}>
					<DirectChat />
				</PrivateRoute>
				<PrivateRoute path='/group' condition={auth.isAuth} exact>
					<Group />
				</PrivateRoute>
				<PrivateRoute path='/group/:groupId' condition={auth.isAuth} exact>
					<GroupChat />
				</PrivateRoute>
				<PrivateRoute path='/admin' condition={auth.isAdmin}>
					<Admin />
				</PrivateRoute>
				<PrivateRoute path='/register/verify/:token' condition={!auth.isAuth}>
					<RegisterVerify />
				</PrivateRoute>
				<PrivateRoute path='/password_reset/verify/:token' condition={!auth.isAuth}>
					<PasswordResetVerify />
				</PrivateRoute>

				<Route component={NotFound} />
			</Switch>
		</Suspense>
	);
};

export default Routes;
