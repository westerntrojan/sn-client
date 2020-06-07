import React, {Suspense, lazy} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import PageLoader from './components/PageLoader';
import PrivateRoute from './components/PrivateRoute';
import {RootState} from '@store/types';

const Home = lazy(() => import('./pages/Home'));
const AddArticle = lazy(() => import('./pages/AddArticle'));
const Article = lazy(() => import('./pages/Article'));
const EditArticle = lazy(() => import('./pages/EditArticle'));
const EditUser = lazy(() => import('./pages/EditUser'));
const User = lazy(() => import('./pages/User'));
const Admin = lazy(() => import('./pages/Admin'));
const Chat = lazy(() => import('./pages/Chat'));
const Messages = lazy(() => import('./pages/Messages'));
const UsersChat = lazy(() => import('./pages/UsersChat'));
const Category = lazy(() => import('./pages/Category'));
const Tag = lazy(() => import('./pages/Tag'));
const Auth = lazy(() => import('./pages/Auth'));
const RegisterVerify = lazy(() => import('./pages/RegisterVerify'));
const PasswordResetEmail = lazy(() => import('./pages/PasswordResetEmail'));
const PasswordResetVerify = lazy(() => import('./pages/PasswordResetVerify'));
const NotFound = lazy(() => import('./components/NotFound'));

const Routes: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	return (
		<Route
			render={({location}: {location: any}): React.ReactNode => {
				let from = location.state && location.state.from.pathname;

				if (from) {
					if (from.split('/').reverse()[1] === 'verify') {
						from = '/';
					}
				}

				return (
					<Suspense fallback={<PageLoader />}>
						<Switch location={location}>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route exact path='/user/:userLink'>
								<User />
							</Route>
							<PrivateRoute path='/article/add' condition={auth.isAuth} redirectTo='/auth'>
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

							<PrivateRoute path='/article/:slug/edit' condition={auth.isAuth} redirectTo='/auth'>
								<EditArticle />
							</PrivateRoute>
							<PrivateRoute path='/user/:userLink/edit' condition={auth.isAuth} redirectTo='/auth'>
								<EditUser />
							</PrivateRoute>
							<PrivateRoute path='/messages' condition={auth.isAuth} redirectTo='/auth'>
								<Messages />
							</PrivateRoute>
							<PrivateRoute path='/users-chat/:userId' condition={auth.isAuth} redirectTo='/auth'>
								<UsersChat />
							</PrivateRoute>
							<PrivateRoute path='/auth' condition={!auth.isAuth} redirectTo={from}>
								<Auth />
							</PrivateRoute>
							<PrivateRoute path='/admin' condition={auth.isAdmin} redirectTo={from}>
								<Admin />
							</PrivateRoute>
							<PrivateRoute
								path='/register/verify/:token'
								condition={!auth.isAuth}
								redirectTo={from}
							>
								<RegisterVerify />
							</PrivateRoute>
							<PrivateRoute path='/password_reset/email' condition={!auth.isAuth} redirectTo={from}>
								<PasswordResetEmail />
							</PrivateRoute>
							<PrivateRoute
								path='/password_reset/verify/:token'
								condition={!auth.isAuth}
								redirectTo={from}
							>
								<PasswordResetVerify />
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
