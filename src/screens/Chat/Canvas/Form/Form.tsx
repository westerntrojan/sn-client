import React, {useState, useRef, useEffect, useContext} from 'react';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {useSelector, shallowEqual} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

import './Form.scss';
import {useAuthModal} from '@utils/hooks';
import ChatContext from '@screens/Chat/ChatContext';
import CanvasContext from '@screens/Chat/Canvas/CanvasContext';
import * as types from '@screens/Chat/Canvas/reducer/types';
import {RootState} from '@store/types';
import EditedMessage from './EditedMessage';
import {RemoveModal} from '@components/common/modals';

const useStyles = makeStyles({
	editedMessage: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		padding: 4,
		display: 'flex',
		alignItems: 'center',
	},
	keyboard: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
		padding: 4,
		boxShadow: 'none',
	},
	input: {
		flex: 1,
		margin: '0 6px',
	},
	attachIcon: {
		transform: 'rotate(-135deg)',
	},
	timer: {
		display: 'flex',
		alignItems: 'center',
	},

	recordingPlaceholder: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	rightButton: {
		position: 'absolute',
		right: 4,
	},
});

const Form: React.FC = () => {
	const classes = useStyles();

	const {handleSubmitMessage, handleEditMessage, handleRemoveMessages} = useContext(ChatContext);
	const {
		state: {editedMessage},
		dispatch,
	} = useContext(CanvasContext);

	const [text, setText] = useState('');
	const [removeMessageModal, setRemoveMessageModal] = useState(false);
	const [recording, setRecording] = useState(false);
	const [mediaStream, setMediaStream] = useState<MediaStream>();
	const [recordingData, setRecordingData] = useState<Blob[]>([]);
	const [voiceRecord, setVoiceRecord] = useState<Blob | null>(null);

	const [buttonWidth, setButtonWidth] = useState(0);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);

	const {openAuthModal} = useAuthModal();

	useEffect(() => {
		if (buttonRef.current) {
			setButtonWidth(buttonRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		if (voiceRecord) {
			_handleSubmit();
		}

		// eslint-disable-next-line
	}, [voiceRecord]);

	useEffect(() => {
		if (editedMessage) {
			setText(editedMessage.text);

			if (inputRef.current) {
				inputRef.current.focus();
			}
		} else {
			setText('');
		}
	}, [editedMessage]);

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	const _handleSubmit = (): void => {
		if (!editedMessage && !text.trim() && !voiceRecord) {
			return;
		}

		if (editedMessage) {
			if (!text.trim()) {
				setRemoveMessageModal(true);
			} else if (editedMessage.text !== text) {
				handleEditMessage({...editedMessage, text});

				dispatch({type: types.REMOVE_EDITED_MESSAGE});
			} else {
				dispatch({type: types.REMOVE_EDITED_MESSAGE});
			}
		} else {
			handleSubmitMessage({
				text,
				audio: voiceRecord,
				type: voiceRecord ? 'audio' : 'text',
			});
		}

		setText('');
		setVoiceRecord(null);
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}
	};
	const _handleKeyDown = (target: React.KeyboardEvent): void => {
		if (target.key === 'Escape') {
			dispatch({type: types.REMOVE_EDITED_MESSAGE});
		}
	};

	const _handleMouseDown = (): void => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};
	const _handleIconClick = (): void => {
		if (!auth.isAuth) {
			return openAuthModal();
		}
	};

	// media recorder events
	const _handleStart = (): void => {
		setRecording(true);

		setRecordingData([]);
	};
	const _handleDataaviable = (e: BlobEvent): void => {
		recordingData.push(e.data);
	};
	const _handleStop = (): void => {
		setRecording(false);

		const blob = new Blob(recordingData, {
			type: 'audio/ogg',
		});

		setVoiceRecord(blob);
	};

	const startRecording = async (): Promise<void> => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({audio: true});
			setMediaStream(stream);

			const mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.addEventListener('start', _handleStart);
			mediaRecorder.addEventListener('dataavailable', _handleDataaviable);
			mediaRecorder.addEventListener('stop', _handleStop);

			mediaRecorder.start();
		} catch (err) {
			alert(err.message);
		}
	};
	const stopRecording = (): void => {
		if (mediaStream) {
			mediaStream.getTracks().forEach(track => track.stop());
		}
	};

	return (
		<div>
			{editedMessage && (
				<>
					<EditedMessage />

					<RemoveModal
						open={removeMessageModal}
						closeModal={() => setRemoveMessageModal(false)}
						text='Do you want to remove this message?'
						action={() => {
							dispatch({type: types.REMOVE_EDITED_MESSAGE});

							handleRemoveMessages([editedMessage._id]);

							setRemoveMessageModal(false);
						}}
					/>
				</>
			)}

			<Paper className={classes.keyboard}>
				{recording && (
					<>
						<div className={classes.timer}>
							<IconButton>
								<FiberManualRecordIcon color='secondary' className='timer-icon' />
							</IconButton>

							<Typography variant='caption'>00:00</Typography>
						</div>

						<Typography variant='caption' className={classes.recordingPlaceholder}>
							Release outside this field to cancel
						</Typography>
					</>
				)}

				{!recording && (
					<>
						<IconButton onClick={_handleIconClick} ref={buttonRef}>
							<AttachFileIcon className={classes.attachIcon} />
						</IconButton>

						<InputBase
							className={classes.input}
							multiline
							rowsMax='10'
							placeholder='Write a message...'
							value={text}
							onChange={_handleChangeText}
							onKeyPress={_handleKeyPressInput}
							onKeyDown={_handleKeyDown}
							onMouseDown={_handleMouseDown}
							autoFocus={auth.isAuth}
							inputRef={inputRef}
						/>

						<IconButton onClick={_handleIconClick} style={{marginRight: buttonWidth}}>
							<InsertEmoticonIcon />
						</IconButton>
					</>
				)}

				<Zoom in={!Boolean(text.trim()) && !Boolean(editedMessage)}>
					<IconButton
						onClick={_handleIconClick}
						color={recording ? 'primary' : 'default'}
						className={classes.rightButton}
						onMouseDown={startRecording}
						onMouseUp={stopRecording}
						onMouseLeave={stopRecording}
					>
						<MicNoneIcon />
					</IconButton>
				</Zoom>

				<Zoom in={Boolean(text.trim()) && !Boolean(editedMessage)}>
					<IconButton color='primary' onClick={_handleSubmit} className={classes.rightButton}>
						<SendIcon />
					</IconButton>
				</Zoom>

				<Zoom in={Boolean(editedMessage)}>
					<IconButton color='primary' onClick={_handleSubmit} className={classes.rightButton}>
						<DoneIcon />
					</IconButton>
				</Zoom>
			</Paper>
		</div>
	);
};

export default Form;
