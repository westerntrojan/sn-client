import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import {Video} from 'cloudinary-react';
import VideoCallIcon from '@material-ui/icons/VideoCall';

import {LinearProgressWithLabel, Loader} from '@components/common/loaders';
import callApi from '@utils/callApi';
import {validateVideo} from '@utils/media';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	previewBox: {
		width: 400,
	},
	videoPreview: {
		width: '100%',
		height: 300,
	},
	videoWrapper: {
		maxWidth: 400,
		height: 300,
		cursor: 'pointer',
		lineHeight: 0,
		position: 'relative',
	},
	loadingBox: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		backgroundColor: 'rgba(0, 0, 0, .6)',
	},
	button: {
		marginRight: 20,
	},
});

type Props = {
	onUploadVideo: (video: string) => void;
	onRemoveVideo: () => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const VideoUploader: React.FC<Props> = ({
	onUploadVideo,
	onRemoveVideo,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const classes = useStyles();

	const [video, setVideo] = useState('');
	const [loading, setLoading] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);
	const [loadingVideoProgress, setLoadingVideoProgress] = useState(0);
	const [videoPreview, setVideoPreview] = useState('');
	const [videoType, setVideoType] = useState('');

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const validationResult = validateVideo(file);

			if (validationResult.success) {
				const blobURL = URL.createObjectURL(file);
				setVideoPreview(blobURL);
				setVideoType(file.type);

				setLoadingVideo(true);
				setLoadingVideoProgress(0);
				onLoadingStart();

				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
				formData.append('resource_type', 'video');
				if (process.env.NODE_ENV !== 'production') {
					formData.append('folder', 'test');
				}

				const config = {
					onUploadProgress: (progressEvent: {loaded: number; total: number}): void => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

						setLoadingVideoProgress(percentCompleted);
					},
				};
				const {data} = await axios.post(
					String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
					formData,
					config,
				);

				setVideo(data.public_id);
				onUploadVideo(data.public_id);

				setLoadingVideo(false);
				onLoadingFinish();
			} else {
				enqueueSnackbar(validationResult.message, {variant: 'error'});
			}
		}
	};

	const _handleRemoveVideo = async (): Promise<void> => {
		if (!video) {
			return;
		}

		setLoading(true);
		onLoadingStart();

		const data = await callApi.delete(`/cloud/video?public_id=${video}`);

		if (data.success) {
			setVideo('');
			onRemoveVideo();
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
		onLoadingFinish();
	};

	return (
		<div className={classes.root}>
			{video ? (
				<Button
					color='secondary'
					variant='contained'
					endIcon={<DeleteIcon />}
					onClick={_handleRemoveVideo}
					disabled={loading || loadingVideo}
					className={classes.button}
				>
					Remove video
				</Button>
			) : (
				<Button
					color='primary'
					variant='contained'
					endIcon={<VideoCallIcon />}
					component='label'
					disabled={loading || loadingVideo}
					className={classes.button}
				>
					Upload video
					<input type='file' style={{display: 'none'}} onChange={_handleChangeVideo} />
				</Button>
			)}

			{loadingVideo && (
				<div className={classes.previewBox}>
					<video className={classes.videoPreview}>
						<source src={videoPreview} type={videoType} />
					</video>

					<LinearProgressWithLabel value={loadingVideoProgress} />
				</div>
			)}

			{!loadingVideo && video && (
				<div className={classes.videoWrapper}>
					<Video
						cloudName={process.env.REACT_APP_CLOUD_NAME}
						publicId={video}
						width='400'
						height='300'
						crop='scale'
						controls
					>
						Cannot display
						<b>video</b>.
					</Video>

					{loading && (
						<div className={classes.loadingBox}>
							<Loader />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default VideoUploader;
