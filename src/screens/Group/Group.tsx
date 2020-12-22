import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router';

import './Group.scss';
import AddGroupModal from './AddGroupModal';
import Loader from '@components/common/loaders/Loader';
import Header from './Header';
import GroupList from './GroupList';
import callApi from '@utils/callApi';
import {RootState} from '@store/types';
import {IGroup} from './types';

const Group: React.FC = () => {
	const history = useHistory();

	const [query, setQuery] = useState('');
	const [groups, setGroups] = useState<IGroup[]>([]);
	const [loading, setLoading] = useState(true);
	const [addGroupModal, setAddGroupModal] = useState(false);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	useEffect(() => {
		const fetchGroups = async (): Promise<void> => {
			const data = await callApi.get(`/groups/${auth.user._id}`);

			setGroups(data.groups);
			setLoading(false);
		};
		fetchGroups();
	}, [auth]);

	const handleSearch = (text: string) => setQuery(text);

	const handleAddGroup = async ({name, members}: {name: string; members: string[]}) => {
		const data = await callApi.post('/groups', {
			admin: auth.user._id,
			name,
			members: members.concat(auth.user._id),
		});

		history.push(`/groups/${data.group._id}`);
	};

	return (
		<Paper className='group'>
			<Helmet>
				<title>Groups / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Header query={query} handleSearch={handleSearch} />

			{loading && <Loader />}

			{!loading && (
				<GroupList groups={groups} query={query} handleAddGroup={() => setAddGroupModal(true)} />
			)}

			<AddGroupModal
				open={addGroupModal}
				handleSubmit={handleAddGroup}
				closeModal={() => setAddGroupModal(false)}
			/>
		</Paper>
	);
};

export default Group;
