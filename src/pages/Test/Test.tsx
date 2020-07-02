import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {Image, Video, Transformation} from 'cloudinary-react';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import callApi from '@utils/callApi';
import {ImageModal} from '@components/modals';

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
	uploader: {
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
}));

const Test: React.FC = () => {
	const classes = useStyles();

	const [image, setImage] = useState('7d3a19b7-0872-420e-9874-5c90e886cbf3');
	const [video, setVideo] = useState('test/video123');
	const [publicId, setPublicId] = useState('');
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setLoading(true);

			const file = e.target.files[0];

			const formData = new FormData();
			formData.append('image', file);

			const data = await callApi.post('/test/image', formData);

			if (data.success) {
				setImage(data.image);
			} else {
				enqueueSnackbar(data.message, {variant: 'error'});
			}

			setLoading(false);
		}
	};

	const _handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setLoading(true);

			const file = e.target.files[0];

			const formData = new FormData();
			formData.append('video', file);

			const data = await callApi.post('/test/video', formData);

			if (data.success) {
				setVideo(data.video);
			} else {
				enqueueSnackbar(data.message, {variant: 'error'});
			}

			setLoading(false);
		}
	};

	const _handleChangePublicId = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPublicId(e.target.value);
	};

	const _handleSubmitPublicId = async (): Promise<void> => {
		if (!publicId.trim()) {
			return;
		}

		setLoading(true);

		const data = await callApi.delete(`/test/${publicId}`);

		if (data.success) {
			enqueueSnackbar('Image success removed', {variant: 'success'});

			setPublicId('');
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
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

			<Backdrop open={loading} className={classes.loadingBackdrop}>
				<CircularProgress color='primary' />
			</Backdrop>

			<div className={classes.content}>
				<div className={classes.actions}>
					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.uploader}
					>
						<input type='file' style={{display: 'none'}} onChange={_handleChangeImage} />
						Upload image
					</Button>

					<Button
						color='primary'
						variant='contained'
						component='label'
						className={classes.uploader}
					>
						<input type='file' style={{display: 'none'}} onChange={_handleChangeVideo} />
						Upload video
					</Button>

					<TextField
						placeholder='public_id'
						value={publicId}
						onChange={_handleChangePublicId}
						onKeyPress={_handleKeyPressInput}
					/>
				</div>

				<div className={classes.result}>
					{image && (
						<Image
							cloudName={process.env.REACT_APP_CLOUD_NAME}
							publicId={image}
							secure='true'
							alt={image}
							fetchFormat='auto'
							onClick={(): void => setImageModal(true)}
							className={classes.image}
						>
							<Transformation quality='65' />
							<Transformation width='400' height='300' crop='fill' />
							<Transformation effect='oil_paint:70' />
						</Image>
					)}

					{video && (
						<Video
							cloudName={process.env.REACT_APP_CLOUD_NAME}
							publicId={video}
							controls='true'
							fallbackContent='Your browser does not support HTML5 video tags.'
							loop='true'
							width='600'
							height='400'
							crop='scale'
						>
							<Transformation quality='auto:low' />
							<Transformation duration='52' />

							<Transformation effect='reverse' />

							<Transformation effect='fade:2000' />
							<Transformation effect='fade:-4000' />

							<Transformation effect='blur:500' />
						</Video>
					)}
				</div>
			</div>

			<ImageModal
				open={imageModal}
				image={`${process.env.REACT_APP_CLOUD_URI}/q_65/${image}`}
				closeModal={(): void => setImageModal(false)}
			/>
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
