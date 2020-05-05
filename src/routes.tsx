import React, {Suspense, lazy} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import PageLoader from './components/PageLoader';
import PrivateRoute from './components/PrivateRoute';
import {RootState} from '@store/types';

const Home = lazy(() => import('./pages/Home'));
const AddArticle = lazy(() => import('./pages/AddArticle'));
const Article = lazy(() => import('./pages/Article'));
const EditArticle = lazy(() => import('./pages/EditArticle'));
const EditUser = lazy(() => import('./pages/EditUser'));
const Auth = lazy(() => import('./pages/Auth'));
const User = lazy(() => import('./pages/User'));
const Admin = lazy(() => import('./pages/Admin'));
const Chat = lazy(() => import('./pages/Chat/ChatClass'));
const Messages = lazy(() => import('./pages/Messages'));
const UsersChat = lazy(() => import('./pages/UsersChat'));
const Category = lazy(() => import('./pages/Category'));
const Tag = lazy(() => import('./pages/Tag'));
const NotFound = lazy(() => import('./components/NotFound'));

const Routes: React.FC = () => {
	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	return (
		<Route
			render={({location}: {location: any}): React.ReactNode => (
				<TransitionGroup className='transition-group'>
					<CSSTransition key={location.key} timeout={300} classNames={'fade'}>
						<Suspense fallback={<PageLoader />}>
							<section className='route-section'>
								<Switch location={location}>
									<Route exact path='/' component={Home} />
									<Route path='/chat' component={Chat} />
									<Route exact path='/user/:userLink' component={User} />
									<PrivateRoute condition={auth.isAuth} redirectTo='/auth' path='/article/add'>
										<AddArticle />
									</PrivateRoute>
									<Route exact path='/article/:slug' component={Article} />
									<PrivateRoute
										condition={auth.isAuth}
										redirectTo='/auth'
										path='/article/:slug/edit'
									>
										<EditArticle />
									</PrivateRoute>
									<PrivateRoute
										condition={auth.isAuth}
										redirectTo='/auth'
										path='/user/:userLink/edit'
									>
										<EditUser />
									</PrivateRoute>
									<PrivateRoute
										condition={!auth.isAuth}
										redirectTo={location.state && location.state.from.pathname}
										path='/auth'
									>
										<Auth />
									</PrivateRoute>
									<PrivateRoute condition={auth.isAuth} redirectTo='/auth' path='/messages'>
										<Messages />
									</PrivateRoute>
									<PrivateRoute
										condition={auth.isAuth}
										redirectTo='/auth'
										path='/users-chat/:userId'
									>
										<UsersChat />
									</PrivateRoute>
									<Route path='/admin' component={Admin} />
									<Route path='/category/:slug' component={Category} />
									<Route path='/tag/:slug' component={Tag} />

									<Route component={NotFound} />
								</Switch>
							</section>
						</Suspense>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
};

export default Routes;
