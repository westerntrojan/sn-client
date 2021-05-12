import React, {useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useQuery, useMutation} from 'react-query';

import callApi from '@/utils/callApi';
import Form from './Form';
import {RootState} from '@/store/types';
import {IUser} from '@/store/types';
import {replaceUser} from '@/store/auth/actions';
import Loader from '@/components/common/loaders/Loader';
import {updateCache} from '@/queryClient';

const EditUser: React.FC = () => {
	const {userLink} = useParams<{userLink: string}>();
	const history = useHistory();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const {isLoading: loadingUser, data: user = {} as IUser} = useQuery<IUser>(
		`/users/${userLink}`,
		async () => {
			const {user} = await callApi.get(`/users/${userLink}`);

			return user;
		},
	);

	const {mutateAsync: editUser} = useMutation(
		(user: IUser) => callApi.put(`/users/${user._id}`, user),
		{
			onSuccess(data) {
				if (data.success) {
					updateCache<IUser>(`/users/${userLink}`, user => ({...user, ...data.user}));

					if (auth.user._id === data.user._id) {
						dispatch(replaceUser(data.user));
					}
				}
			},
		},
	);

	useEffect(() => {
		if (!loadingUser) {
			if (user._id !== auth.user._id || !auth.isAdmin) {
				history.goBack();
			}
		}
	}, [loadingUser]);

	return (
		<div className='edit-user'>
			<Helmet>
				<title>Edit profile / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			{loadingUser ? <Loader /> : <Form user={user} handleSubmit={editUser} />}
		</div>
	);
};

export default EditUser;
