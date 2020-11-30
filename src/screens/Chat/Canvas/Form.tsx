import React, {useState, useRef, useEffect, useCallback, useContext} from 'react';
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
import Typography from '@material-ui/core/Typography';

import {useAuthModal} from '@utils/hooks';
import Context from '@screens/Chat/context';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
		padding: 4,
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

type Props = {
	auth: {
		isAuth: boolean;
	};
};

const Form: React.FC<Props> = ({auth}) => {
	const classes = useStyles();

	const {handleSubmitMessage} = useContext(Context);

	const [text, setText] = useState('');
	const [icon, setIcon] = useState(0);
	const [recording, setRecording] = useState(false);
	const [mediaStream, setMediaStream] = useState<MediaStream>();
	const [recordingData, setRecordingData] = useState<Blob[]>([]);
	const [voiceRecord, setVoiceRecord] = useState<Blob | null>(null);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [buttonWidth, setButtonWidth] = useState(0);

	const {openAuthModal} = useAuthModal();

	const validate = useCallback(() => {
		if (text.trim()) {
			setIcon(1);
		} else {
			setIcon(0);
		}
	}, [text]);

	useEffect(() => {
		if (buttonRef.current) {
			setButtonWidth(buttonRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		validate();
	}, [validate]);

	useEffect(() => {
		_handleSubmit();

		// eslint-disable-next-line
	}, [voiceRecord]);

	const _handleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setText(e.target.value);
	};

	const _handleSubmit = (): void => {
		if (!text.trim() && !voiceRecord) {
			return;
		}

		const message = {
			text,
			audio: voiceRecord,
			type: voiceRecord ? 'audio' : 'text',
		};

		handleSubmitMessage(message);

		setText('');
		setVoiceRecord(null);
	};

	const _handleKeyDown = (target: React.KeyboardEvent): void => {
		// if (target.ctrlKey && target.keyCode === 13) {
		// 	setText(text + '\n');
		// }
	};
	const _handleKeyPressInput = (target: React.KeyboardEvent): void => {
		if (target.ctrlKey && target.charCode === 13) {
			_handleSubmit();
		}

		// if (!target.ctrlKey && target.charCode === 13) {
		// 	target.preventDefault();
		// 	_handleSubmit();
		// }
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
		<Paper className={classes.root}>
			{recording && (
				<>
					<div className={classes.timer}>
						<IconButton>
							<FiberManualRecordIcon color='secondary' />
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
						onKeyDown={_handleKeyDown}
						onKeyPress={_handleKeyPressInput}
						onMouseDown={_handleMouseDown}
						autoFocus={auth.isAuth}
					/>

					<IconButton onClick={_handleIconClick} style={{marginRight: buttonWidth}}>
						<InsertEmoticonIcon />
					</IconButton>

					<Zoom in={Boolean(icon)}>
						<IconButton color='primary' onClick={_handleSubmit} className={classes.rightButton}>
							<SendIcon />
						</IconButton>
					</Zoom>
				</>
			)}

			<Zoom in={!Boolean(icon)}>
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
		</Paper>
	);
};

export default Form;
