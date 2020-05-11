import React, {useState, useEffect, useRef, useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {useSnackbar} from 'notistack';

import Loader from '@components/Loader';
import {RemoveMessageModal} from '@components/modals';
import Header from './Header';
import Message from './Message';
import MyMessage from './MyMessage';
import Form from './Form';
import ImageModal from './ImageModal';
import AlterHeader from '@components/chats/AlterHeader';
import ForNotAuth from '@components/ForNotAuth';
import {IMessage} from '@pages/Chat/types';
import Context, {IContext} from '@pages/Chat/context';

const useStyles = makeStyles({
	root: {
		position: 'relative',
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
		flex: 1,
	},
	messages: {
		padding: '0 20px',
		height: '100%',
		overflow: 'auto',
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
	handleRemoveMessages: (messages: string[]) => void;
};

const Canvas: React.FC<Props> = ({messages, auth, removed, loading, handleRemoveMessages}) => {
	const classes = useStyles();

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [alterHeader, setAlterHeader] = useState(false);
	const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
	const [removeMessagesModal, setRemoveMessagesModal] = useState(false);
	const [image, setImage] = useState<File | null>(null);
	const [imageModal, setImageModal] = useState(false);

	const {handleSubmitMessage}: IContext = useContext(Context);

	const {enqueueSnackbar} = useSnackbar();

	useEffect(() => {
		if (!removed && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({block: 'end'});
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

			setImage(file);
			setImageModal(true);
		}
	};

	const handleSubmit = (data: any): void => {
		if (data.type === 'image') {
			// data - {type: 'image'}

			const message = {...data, image};

			console.log(message);
		} else if (data.type === 'image_text') {
			// data - {type: 'image', caption: string}

			const message = {...data, image};

			console.log(message);
		} else {
			// data - {type: 'text', text: string}

			handleSubmitMessage(data);
		}
	};

	return (
		<Paper className={classes.root}>
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

			<div className={classes.messages}>
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

				<div ref={messagesEndRef} />
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
				image={image}
				handleSubmit={handleSubmit}
				closeModal={(): void => setImageModal(false)}
			/>
		</Paper>
	);
};

export default Canvas;
