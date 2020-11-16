import React, {Suspense, lazy} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PageLoader from './components/PageLoader';
import PrivateRoute from './components/PrivateRoute';
import {RootState} from '@store/types';
import Home from './screens/Home';

const AddArticle = lazy(() => import('./screens/AddArticle'));
const Article = lazy(() => import('./screens/Article'));
const EditArticle = lazy(() => import('./screens/EditArticle'));
const EditUser = lazy(() => import('./screens/EditUser'));
const User = lazy(() => import('./screens/User'));
const Admin = lazy(() => import('./screens/Admin'));
const Chat = lazy(() => import('./screens/Chat'));
const Messages = lazy(() => import('./screens/Messages'));
const UsersChat = lazy(() => import('./screens/UsersChat'));
const Category = lazy(() => import('./screens/Category'));
const Tag = lazy(() => import('./screens/Tag'));
const RegisterVerify = lazy(() => import('./screens/RegisterVerify'));
const PasswordResetVerify = lazy(() => import('./screens/PasswordResetVerify'));
const Subscriptions = lazy(() => import('./screens/Subscriptions'));
const Bookmarks = lazy(() => import('./screens/Bookmarks'));
const Example = lazy(() => import('./screens/Example'));
const NotFound = lazy(() => import('./components/common/NotFound'));

const Routes: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const appPreLoading = useSelector((state: RootState) => state.app.preLoading, shallowEqual);

	if (appPreLoading) {
		return <PageLoader />;
	}

	return (
		<Route
			render={({location}: {location: any}): React.ReactNode => {
				return (
					<Suspense fallback={<PageLoader />}>
						<Switch location={location}>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route exact path='/user/:userLink'>
								<User />
							</Route>
							<PrivateRoute path='/article/add' condition={auth.isAuth} redirectTo='/'>
								<AddArticle />
							</PrivateRoute>
							<Route exact path='/article/:slug'>
								<Article />
							</Route>

							<Route path='/chat'>
								<Chat />
							</Route>
							<Route path='/category/:slug'>
								<Category />
							</Route>
							<Route path='/tag/:slug'>
								<Tag />
							</Route>

							<Route path='/subscriptions'>
								<Subscriptions />
							</Route>
							<Route path='/bookmarks'>
								<Bookmarks />
							</Route>

							<PrivateRoute path='/article/:slug/edit' condition={auth.isAuth} redirectTo='/'>
								<EditArticle />
							</PrivateRoute>
							<PrivateRoute path='/user/:userLink/edit' condition={auth.isAuth} redirectTo='/'>
								<EditUser />
							</PrivateRoute>
							<PrivateRoute path='/messages' condition={auth.isAuth} redirectTo='/'>
								<Messages />
							</PrivateRoute>
							<PrivateRoute path='/users-chat/:userId' condition={auth.isAuth} redirectTo='/'>
								<UsersChat />
							</PrivateRoute>
							<PrivateRoute path='/admin' condition={auth.isAdmin} redirectTo='/'>
								<Admin />
							</PrivateRoute>
							<PrivateRoute path='/register/verify/:token' condition={!auth.isAuth} redirectTo='/'>
								<RegisterVerify />
							</PrivateRoute>
							<PrivateRoute
								path='/password_reset/verify/:token'
								condition={!auth.isAuth}
								redirectTo='/'
							>
								<PasswordResetVerify />
							</PrivateRoute>
							<PrivateRoute path='/example' condition={auth.isAdmin} redirectTo='/'>
								<Example />
							</PrivateRoute>

							<Route component={NotFound} />
						</Switch>
					</Suspense>
				);
			}}
		/>
	);
};

export default Routes;
