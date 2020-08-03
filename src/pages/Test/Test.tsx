import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import {Image, Video, Transformation, Audio, CloudinaryContext} from 'cloudinary-react';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

import callApi from '@utils/callApi';
import {ImageModal} from '@components/modals';
import {CircularProgressWithLabel} from '@components/loaders';
import {validateVideo} from '@utils/video';

const useStyles = makeStyles(theme => ({
	loadingBackdrop: {
		zIndex: theme.zIndex.drawer + 3,
	},
	content: {
		display: 'flex',
		alignItems: 'flex-start',
	},
	actions: {
		marginRight: 20,
		display: 'flex',
		flexDirection: 'column',
	},
	action: {
		marginBottom: 20,
	},
	result: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	image: {
		marginBottom: 20,
		cursor: 'pointer',
	},
	video: {
		marginBottom: 20,
	},
	audio: {
		border: '1px solid red',
	},
}));

const Test: React.FC = () => {
	const classes = useStyles();

	const [image, setImage] = useState('');
	const [video, setVideo] = useState('');
	const [audio, setAudio] = useState('');
	const [publicId, setPublicId] = useState('');
	const [resourceType, setResourceType] = useState('image');
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [disabledActions, setDisabledActions] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const axiosConfig = {
		onUploadProgress: (progressEvent: {loaded: number; total: number}): void => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

			setLoadingProgress(percentCompleted);
		},
	};

	const _handleChangeResourceType = (event: React.ChangeEvent<{value: unknown}>): void => {
		setResourceType(event.target.value as string);
	};

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setLoading(true);

			const file = e.target.files[0];

			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
			formData.append('folder', 'test');

			const {data} = await axios.post(
				String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
				formData,
				axiosConfig,
			);

			setImage(data.public_id);

			setLoading(false);
		}
	};

	const _handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const validationResult = validateVideo(file);

			if (validationResult.success) {
				setLoading(true);

				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
				formData.append('resource_type', 'video');
				formData.append('folder', 'test');

				const {data} = await axios.post(
					String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
					formData,
					axiosConfig,
				);

				setVideo(data.public_id);

				setLoading(false);
			} else {
				enqueueSnackbar(validationResult.message, {variant: 'error'});
			}
		}
	};

	const _handleChangeAudio = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setLoading(true);

			const file = e.target.files[0];

			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
			formData.append('resource_type', 'video');
			formData.append('folder', 'test');

			const {data} = await axios.post(
				String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
				formData,
				axiosConfig,
			);

			setAudio(data.public_id);

			setLoading(false);
		}
	};

	const _handleChangeAudios = (e: React.ChangeEvent<HTMLInputElement>): void => {
		console.log(e.target.files);
	};

	const _handleChangePublicId = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPublicId(e.target.value);
	};

	const _handleSubmitPublicId = async (): Promise<void> => {
		if (!publicId.trim()) {
			return;
		}

		setDisabledActions(true);

		const data = await callApi.delete(`/cloud/${resourceType}?public_id=test/${publicId}`);

		if (data.success) {
			enqueueSnackbar('Image success removed', {variant: 'success'});

			setPublicId('');
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setDisabledActions(false);
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent): void => {
		if (target.charCode === 13) {
			_handleSubmitPublicId();
		}
	};

	return (
		<section className='test'>
			<Helmet>
				<title>Test / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<div className={classes.content}>
				<div className={classes.actions}>
					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.action}
						disabled={disabledActions}
					>
						<input type='file' style={{display: 'none'}} onChange={_handleChangeImage} />
						Upload image
					</Button>

					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.action}
						disabled={disabledActions}
					>
						<input type='file' style={{display: 'none'}} onChange={_handleChangeVideo} />
						Upload video
					</Button>

					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.action}
						disabled={disabledActions}
					>
						<input type='file' style={{display: 'none'}} onChange={_handleChangeAudio} />
						Upload audio
					</Button>

					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.action}
						disabled={disabledActions}
					>
						<input type='file' style={{display: 'none'}} multiple onChange={_handleChangeAudios} />
						Upload audios
					</Button>

					<TextField
						placeholder='public_id'
						value={publicId}
						onChange={_handleChangePublicId}
						onKeyPress={_handleKeyPressInput}
						disabled={disabledActions}
						className={classes.action}
					/>

					<FormControl variant='outlined'>
						<InputLabel id='demo-simple-select-label'>Resource type</InputLabel>

						<Select
							labelId='demo-simple-select-label'
							value={resourceType}
							onChange={_handleChangeResourceType}
							label='Resource type'
						>
							<MenuItem value={'image'}>Image</MenuItem>
							<MenuItem value={'video'}>Video</MenuItem>
							<MenuItem value={'audio'}>Audio</MenuItem>
						</Select>
					</FormControl>
				</div>

				<CloudinaryContext className={classes.result} cloudName={process.env.REACT_APP_CLOUD_NAME}>
					{image && (
						<Image
							publicId={image}
							secure='true'
							alt={image}
							fetchFormat='auto'
							onClick={(): void => setImageModal(true)}
							className={classes.image}
							responsive
							onLoad={(): void => console.log('image loading')}
						>
							<Transformation quality='65' />
							<Transformation width='400' height='300' crop='fill' />
							<Transformation effect='oil_paint:70' />
						</Image>
					)}

					{video && (
						<div className={classes.video}>
							<Video
								publicId={video}
								width='600'
								height='400'
								crop='scale'
								poster='https://sm.ign.com/ign_ru/screenshot/default/y42hjyacnla79i0vy0qa5q_3a3z.jpg'
								loop
								controls
							>
								<Transformation effect='volume:50' />
								<Transformation quality='auto:low' />
								<Transformation duration='52' />
								<Transformation effect='reverse' />
								<Transformation effect='fade:2000' />
								<Transformation effect='fade:-4000' />
								<Transformation effect='blur:500' />
								Cannot display
								<b>video</b>.
							</Video>
						</div>
					)}

					{audio && (
						<div>
							<Audio publicId={audio} controls>
								Cannot play
								<b>audio</b>.
							</Audio>
						</div>
					)}
				</CloudinaryContext>
			</div>

			<ImageModal
				open={imageModal}
				image={`${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${image}`}
				closeModal={(): void => setImageModal(false)}
			/>

			<Backdrop open={loading} className={classes.loadingBackdrop}>
				<CircularProgressWithLabel value={loadingProgress} />
			</Backdrop>
		</section>
	);
};

export default Test;

// effect='outline:15:200'
// color='orange'
// background='auto:predominant'
// effect='gradient_fade:symmetric_pad'
// background='black'
// opacity='60'
// effect='brightness:200'
// x='355'
// y='410'
// aspectRatio="4:3"
// flags='lossy'
// quality='auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best'
// angle='10'
// radius='max'
