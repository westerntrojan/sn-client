import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {useSelector, shallowEqual} from 'react-redux';
import {Helmet} from 'react-helmet';

import './Direct.scss';
import Loader from '@/components/common/loaders/Loader';
import Header from './Header';
import ChatsList from './ChatsList';
import {RemoveModal} from '@/components/common/modals';
import callApi from '@/utils/callApi';
import {RootState} from '@/store/types';
import {IChat} from './types';
import Context from './context';

const Direct: React.FC = () => {
	const [chatId, setChatId] = useState('');
	const [query, setQuery] = useState('');
	const [chats, setChats] = useState<IChat[]>([]);
	const [removeChatModal, setRemoveChatModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	useEffect(() => {
		const fetchChats = async (): Promise<void> => {
			const data = await callApi.get(`/chats/${auth.user._id}`);

			setChats(data.chats);
			setLoading(false);
		};
		fetchChats();
	}, [auth]);

	const openRemoveChatModal = (chatId: string) => {
		setRemoveChatModal(true);

		setChatId(chatId);
	};

	const handleSearch = (text: string) => setQuery(text);

	const handleRemoveChat = async (): Promise<void> => {
		const data = await callApi.delete(`/chats/${chatId}`);

		if (data.success) {
			setChats(chats.filter((chat: IChat) => chat._id !== chatId));

			setRemoveChatModal(false);
		}
	};

	return (
		<Paper className='direct'>
			<Helmet>
				<title>Direct / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Context.Provider value={{handleRemoveModal: openRemoveChatModal}}>
				<Header query={query} handleSearch={handleSearch} />

				{loading && <Loader />}

				{!loading && <ChatsList chats={chats} query={query} />}
			</Context.Provider>

			<RemoveModal
				open={removeChatModal}
				text='Are you sure you want to remove this chat ?'
				action={handleRemoveChat}
				closeModal={() => setRemoveChatModal(false)}
			/>
		</Paper>
	);
};

export default Direct;
