import React, {useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useQuery, useMutation} from 'react-query';

import './User.scss';
import Loader from '@/components/common/loaders/Loader';
import RemoveUserModal from './RemoveUserModal';
import UserInfo from './UserInfo';
import UserActions from './UserActions';
import UserStatistics from './UserStatistics';
import RemovedAvatar from './removed/RemovedAvatar';
import RemovedInfo from './removed/RemovedInfo';
import callApi from '@/utils/callApi';
import {exit} from '@/store/auth/actions';
import {RootState} from '@/store/types';
import Context from './context';
import {IUserStatistics} from './types';
import {followToUser, unfollowFromUser} from '@/store/auth/actions';
import {updateCache} from '@/queryClient';

const User: React.FC = () => {
	const {userLink} = useParams<{userLink: string}>();
	const history = useHistory();

	const [removeModal, setRemoveModal] = useState(false);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	const {isLoading: loadingUser, data: user = {} as IUserStatistics} = useQuery<IUserStatistics>(
		`/users/${userLink}`,
		async () => {
			const {user} = await callApi.get(`/users/${userLink}`);

			return user;
		},
	);

	const {mutate: removeUser} = useMutation(() => callApi.delete(`/users/${user._id}`), {
		onSuccess(data) {
			if (data.userId === auth.user._id) {
				dispatch(exit());

				history.push('/');
			}
		},
	});

	const handleFollowToUser = () => {
		if (auth.user.following.includes(user._id)) {
			dispatch(unfollowFromUser(user._id));

			updateCache<IUserStatistics>(`/users/${userLink}`, user => ({
				...user,
				statistics: {
					...user.statistics,
					followers: user.statistics.followers - 1,
				},
			}));
		} else {
			dispatch(followToUser(user._id));

			updateCache<IUserStatistics>(`/users/${userLink}`, user => ({
				...user,
				statistics: {
					...user.statistics,
					followers: user.statistics.followers + 1,
				},
			}));
		}
	};

	return (
		<section className='user'>
			<Helmet>
				<title>
					{user ? `${user.firstName} ${user.lastName}`.trim() : 'User'} /{' '}
					{process.env.REACT_APP_TITLE}
				</title>
			</Helmet>

			<Context.Provider value={{auth, user}}>
				{loadingUser && <Loader />}

				{!loadingUser && !user.isRemoved && (
					<div className='user-data'>
						<UserActions
							handleRemoveUser={() => setRemoveModal(true)}
							handleFollowToUser={handleFollowToUser}
						/>

						<div className='user-subdata'>
							<UserInfo />
							<UserStatistics />
						</div>
					</div>
				)}

				{!loadingUser && user.isRemoved && (
					<div className='user-data'>
						<RemovedAvatar />
						<RemovedInfo user={user} />
					</div>
				)}
			</Context.Provider>

			<RemoveUserModal
				open={removeModal}
				closeModal={() => setRemoveModal(false)}
				action={removeUser}
			/>
		</section>
	);
};

export default User;
