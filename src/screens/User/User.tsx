import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useParams} from 'react-router';
import {Helmet} from 'react-helmet';

import './User.scss';
import Loader from '@components/common/loaders/Loader';
import {RemoveUserModal} from '@components/common/modals';
import UserInfo from './components/UserInfo';
import UserActions from './components/UserActions';
import UserStatistics from './components/UserStatistics';
import RemovedAvatar from './components/removed/RemovedAvatar';
import RemovedInfo from './components/removed/RemovedInfo';
import callApi from '@utils/callApi';
import {removeUser} from '@store/auth/actions';
import {RootState} from '@store/types';
import {IUserStatistics, IFetchData} from './types';
import useRedirect from '@utils/hooks/useRedirect';

const User: React.FC = () => {
	const {userLink} = useParams();

	const [user, setUser] = useState<IUserStatistics | null>(null);
	const [removeModal, setRemoveModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const {redirectTo} = useRedirect();

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			const data: IFetchData = await callApi.get(`/users/${userLink}`);

			setUser(data.user);

			setLoading(false);
		};
		fetchUser();
	}, [userLink, dispatch]);

	const openRemoveModal = (): void => {
		setRemoveModal(true);
	};

	const handleRemove = async (): Promise<void> => {
		if (user) {
			await dispatch(removeUser(user._id));
		}

		redirectTo('/');
	};

	if (loading) {
		return <Loader disableMargin />;
	}

	return (
		<section className='user'>
			<Helmet>
				<title>
					{user ? `${user.firstName} ${user.lastName}`.trim() : 'User'} /{' '}
					{process.env.REACT_APP_TITLE}
				</title>
			</Helmet>

			{user && !user.isRemoved && (
				<div className='user-data'>
					<UserActions auth={auth} user={user} handleRemove={openRemoveModal} />
					<div className='user-subdata'>
						<UserInfo user={user} />
						<UserStatistics user={user} />
					</div>
				</div>
			)}

			{user && user.isRemoved && (
				<div className='user-data'>
					<RemovedAvatar />
					<RemovedInfo user={user} />
				</div>
			)}

			<RemoveUserModal
				open={removeModal}
				closeModal={(): void => setRemoveModal(false)}
				action={handleRemove}
			/>
		</section>
	);
};

export default User;
