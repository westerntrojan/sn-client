import React, {useState, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import {Audio} from 'cloudinary-react';
import Typography from '@material-ui/core/Typography';

import callApi from '@utils/callApi';
import {validateAudio} from '@utils/audio';
import {IAudioTrack} from '@store/types';
import {LinearProgressWithLabel} from '@components/loaders';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	button: {
		marginRight: 20,
	},
	loadingProgress: {
		width: 280,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

type Props = {
	onUploadAudio: (audioTrack: IAudioTrack) => void;
	onRemoveAudio: (publicId: string) => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const AudioUploader: React.FC<Props> = ({
	onUploadAudio,
	onRemoveAudio,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const classes = useStyles();

	const [audio, setAudio] = useState<IAudioTrack | null>(null);
	const [loading, setLoading] = useState(false);
	const [loadingAudio, setLoadingAudio] = useState(false);
	const [loadingAudioProgress, setLoadingAudioProgress] = useState(0);
	const [filename, setFilename] = useState('');

	const inputRef = useRef<HTMLInputElement | null>(null);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeAudio = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const validationResult = validateAudio(file);

			if (validationResult.success) {
				setFilename(file.name);
				setLoadingAudio(true);
				setLoadingAudioProgress(0);
				onLoadingStart();
				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
				if (process.env.NODE_ENV !== 'production') {
					formData.append('folder', 'test');
				}
				const config = {
					onUploadProgress: (progressEvent: {loaded: number; total: number}): void => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setLoadingAudioProgress(percentCompleted);
					},
				};
				const {data} = await axios.post(
					String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
					formData,
					config,
				);
				onUploadAudio({
					filename: file.name,
					publicId: data.public_id,
				});
				setAudio({
					filename: file.name,
					publicId: data.public_id,
				});
				setLoadingAudio(false);
				onLoadingFinish();
			} else {
				if (inputRef.current) {
					inputRef.current.value = '';
				}
				enqueueSnackbar(validationResult.message, {variant: 'error'});
			}
		}
	};

	const _handleRemoveAudio = async (): Promise<void> => {
		if (!audio) {
			return;
		}

		setLoading(true);
		onLoadingStart();

		const data = await callApi.delete(`/cloud/audio?public_id=${audio.publicId}`);

		if (data.success) {
			onRemoveAudio(audio.publicId);
			setAudio(null);
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
		onLoadingFinish();
	};

	return (
		<div className={classes.root}>
			{audio ? (
				<Button
					color='secondary'
					variant='contained'
					endIcon={<DeleteIcon />}
					onClick={_handleRemoveAudio}
					disabled={loading || loadingAudio}
					className={classes.button}
				>
					Remove audio
				</Button>
			) : (
				<Button
					color='primary'
					variant='contained'
					endIcon={<MusicNoteIcon />}
					component='label'
					disabled={loading || loadingAudio}
					className={classes.button}
				>
					Upload audio
					<input
						type='file'
						ref={inputRef}
						style={{display: 'none'}}
						onChange={_handleChangeAudio}
						multiple
					/>
				</Button>
			)}

			{loadingAudio && (
				<div className={classes.loadingProgress}>
					<Typography variant='caption'>{filename}</Typography>

					<LinearProgressWithLabel value={loadingAudioProgress} />
				</div>
			)}

			{!loadingAudio && audio && (
				<Audio
					cloudName={process.env.REACT_APP_CLOUD_NAME}
					width={280}
					publicId={audio.publicId}
					controls
				>
					Cannot play
					<b>audio</b>.
				</Audio>
			)}
		</div>
	);
};

export default AudioUploader;
