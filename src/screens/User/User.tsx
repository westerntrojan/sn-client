import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {Helmet} from 'react-helmet';

import './User.scss';
import Loader from '@components/common/loaders/Loader';
import RemoveUserModal from './RemoveUserModal';
import UserInfo from './UserInfo';
import UserActions from './UserActions';
import UserStatistics from './UserStatistics';
import RemovedAvatar from './removed/RemovedAvatar';
import RemovedInfo from './removed/RemovedInfo';
import callApi from '@utils/callApi';
import {removeUser} from '@store/auth/actions';
import {RootState} from '@store/types';
import {IUserStatistics, IFetchData} from './types';
import Context from './context';
import {followToUser, unfollowFromUser} from '@store/auth/actions';

const User: React.FC = () => {
	const {userLink} = useParams<{userLink: string}>();
	const history = useHistory();

	const [user, setUser] = useState<IUserStatistics | null>(null);
	const [removeModal, setRemoveModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			const data: IFetchData = await callApi.get(`/users/${userLink}`);

			setUser(data.user);

			setLoading(false);
		};
		fetchUser();
	}, [userLink]);

	const openRemoveModal = () => {
		setRemoveModal(true);
	};

	const handleFollowToUser = () => {
		if (user) {
			if (auth.user.following.includes(user._id)) {
				dispatch(unfollowFromUser(user._id));

				setUser({
					...user,
					statistics: {
						...user.statistics,
						followers: user.statistics.followers - 1,
					},
				});
			} else {
				dispatch(followToUser(user._id));

				setUser({
					...user,
					statistics: {
						...user.statistics,
						followers: user.statistics.followers + 1,
					},
				});
			}
		}
	};

	const handleRemoveUser = async (): Promise<void> => {
		if (user) {
			await dispatch(removeUser(user._id));

			history.push('/');
		}
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

			<Context.Provider value={{auth, user}}>
				{user && !user.isRemoved && (
					<div className='user-data'>
						<UserActions
							handleRemoveUser={openRemoveModal}
							handleFollowToUser={handleFollowToUser}
						/>

						<div className='user-subdata'>
							<UserInfo />
							<UserStatistics />
						</div>
					</div>
				)}

				{user && user.isRemoved && (
					<div className='user-data'>
						<RemovedAvatar />
						<RemovedInfo user={user} />
					</div>
				)}
			</Context.Provider>

			<RemoveUserModal
				open={removeModal}
				closeModal={() => setRemoveModal(false)}
				action={handleRemoveUser}
			/>
		</section>
	);
};

export default User;
