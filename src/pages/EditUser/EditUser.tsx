import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {Helmet} from 'react-helmet';

import callApi from '@utils/callApi';
import {getArticles} from '@store/articles/actions';
import UserForm from './components/UserForm';
import {RootState} from '@store/types';
import {IFetchData} from './types';
import {IUser} from '@store/types';
import {replaceUser} from '@store/auth/actions';
import PageLoader from '@components/PageLoader';

const EditUser: React.FC = () => {
	const {userLink} = useParams();
	const history = useHistory();

	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			const data: IFetchData = await callApi.get(`/users/${userLink}`);

			if (data.user) {
				if (data.user._id === auth.user._id || auth.isAdmin) {
					setUser(data.user);
					setLoading(false);
				} else {
					history.goBack();
				}
			}
		};
		fetchUser();
	}, [userLink, dispatch, auth.user._id, auth.isAdmin, history]);

	if (loading) {
		return <PageLoader />;
	}

	const handleSubmit = async (user: IUser): Promise<any> => {
		const data: any = await callApi.put(`/users/${user._id}`, user);

		if (data.success) {
			setUser(data.user);

			if (auth.user._id === user._id) {
				dispatch(replaceUser(user));
				dispatch(getArticles());
			}
		}

		return data;
	};

	return (
		<div className='edit-user'>
			<Helmet>
				<title>Edit profile / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{user && <UserForm user={user} handleSubmit={handleSubmit} />}
		</div>
	);
};

export default EditUser;
