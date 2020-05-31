import React, {useState, useEffect, useRef, useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {useSnackbar} from 'notistack';
// import _ from 'lodash';

import Loader from '@components/Loader';
import {RemoveMessageModal} from '@components/modals';
import Header from './components/Header';
import Message from './components/Message';
import Form from './components/Form';
import ImageModal from './components/ImageModal';
import DragDrop from './components/DragDrop';
import MyMessage from '@components/chat/MyMessage';
import AlterHeader from '@components/chat/AlterHeader';
import ForNotAuth from '@components/ForNotAuth';
import {IMessage} from '@components/chat/types';
import Context from '@pages/Chat/context';

const useStyles = makeStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	messages: {
		overflow: 'auto',
		flex: 1,
		position: 'relative',
	},
});

type Props = {
	messages: IMessage[];
	auth: {
		isAuth: boolean;
		user: {
			_id: string;
		};
	};
	removed: boolean;
	loading: boolean;
	loadMore: () => void;
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({
	messages,
	auth,
	removed,
	loading,
	loadMore,
	handleRemoveMessages,
}) => {
	const classes = useStyles();

	const [alterHeader, setAlterHeader] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
	const [removeMessagesModal, setRemoveMessagesModal] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState('');
	const [imageModal, setImageModal] = useState(false);
	const [dragDrop, setDragDrop] = useState(false);
	const messagesContainer = useRef<HTMLDivElement>(null);

	const {handleSubmitMessage} = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		if (!removed && messagesContainer.current) {
			messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
		}
	}, [messages, removed]);

	const openRemoveMessagesModal = (): void => {
		setRemoveMessagesModal(true);
	};

	const selectMessage = (_id: string): void => {
		if (!alterHeader) {
			setAlterHeader(true);
		}

		if (selectedMessages.includes(_id)) {
			setSelectedMessages(selectedMessages.filter(message => message !== _id));
		} else {
			setSelectedMessages(selectedMessages.concat(_id));
		}
	};

	const closeAlterHeader = (): void => {
		setAlterHeader(false);
		setSelectedMessages([]);
	};

	const removeMessages = (): void => {
		handleRemoveMessages(selectedMessages);
		setSelectedMessages([]);
		closeAlterHeader();
		setRemoveMessagesModal(false);
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files) {
			const types = ['image/jpg', 'image/png', 'image/jpeg'];

			const file = e.target.files[0];

			if (!types.includes(file.type)) {
				enqueueSnackbar('Invalid file type (only: jpg, png, jpeg)', {variant: 'error'});

				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				enqueueSnackbar('Invalid file size (max: 5MB)', {variant: 'error'});

				return;
			}

			setImageFile(file);

			const reader = new FileReader();

			reader.onload = (data: any): void => {
				setImagePreview(data.target.result);
			};

			reader.readAsDataURL(file);

			setImageModal(true);
		}
	};

	const handleSubmit = (data: {type: string; text?: string; caption?: string}): void => {
		const {type, text = '', caption = ''} = data;

		handleSubmitMessage({type, text, caption, image: imageFile});

		setImageFile(null);
		setImagePreview('');
	};

	const _handleMessagesScroll = (e: React.UIEvent<HTMLDivElement>): void => {
		// scrollTop/Left - расстояние от верха/лево блока (можно переопределять)
		// scrollWidth/Height - длина блока включая скролл
		// clientWidth/Height, offsetWidth/Height - длина блока не включая скролл
		// if (e.currentTarget.scrollTop === 0) {
		// 	_.debounce(() => loadMore(), 200);
		// 	if (messagesContainer.current) {
		// 		messagesContainer.current.scrollTop = 200;
		// 	}
		// 	console.log(e.currentTarget.scrollTop);
		// }
	};

	return (
		<Paper
			className={classes.root}
			// onDragStart={(e): void => e.preventDefault()}
			// onDragOver={(): void => console.log('onDragOver')}
			// onDragEnter={(): void => console.log('onDragEnter')}
			// onDragExit={(): void => console.log('onDragExit')}
		>
			{alterHeader && selectedMessages.length ? (
				<AlterHeader
					selectedMessages={selectedMessages.length}
					closeAlterHeader={closeAlterHeader}
					openRemoveMessagesModal={openRemoveMessagesModal}
				/>
			) : (
				<Header />
			)}

			<Divider />

			<div className={classes.messages} ref={messagesContainer} onScroll={_handleMessagesScroll}>
				{loading && <Loader />}

				{auth.user &&
					messages &&
					messages.map(message => {
						if (message.user._id === auth.user._id) {
							return (
								<MyMessage
									message={message}
									key={message._id}
									selectMessage={selectMessage}
									alterHeader={alterHeader}
								/>
							);
						}

						return <Message message={message} key={message._id} />;
					})}

				{!auth.user &&
					messages &&
					messages.map(message => <Message message={message} key={message._id} />)}
			</div>

			{auth.isAuth ? (
				<>
					<Divider />
					<Form handleSubmit={handleSubmit} handleChangeImage={handleChangeImage} />
				</>
			) : (
				<ForNotAuth text={'Only full users can using chat.'} />
			)}

			<RemoveMessageModal
				selectedMessages={selectedMessages.length}
				open={removeMessagesModal}
				action={removeMessages}
				closeModal={(): void => setRemoveMessagesModal(false)}
			/>
			<ImageModal
				open={imageModal}
				imagePreview={imagePreview}
				handleSubmit={handleSubmit}
				closeModal={(): void => setImageModal(false)}
			/>

			<DragDrop visible={dragDrop} />
		</Paper>
	);
};

export default Canvas;
