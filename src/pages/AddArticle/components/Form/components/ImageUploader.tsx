import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import BackupIcon from '@material-ui/icons/Backup';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useSnackbar} from 'notistack';

import {ImageModal} from '@components/modals';
import {CircularProgressWithLabel, Loader} from '@components/loaders';
import callApi from '@utils/callApi';
import {validateImage} from '@utils/images';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	button: {
		marginRight: 20,
	},
	imageWrapper: {
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
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'fill',
	},
});

type Props = {
	onUploadImage: (image: string) => void;
	onRemoveImage: () => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const ImageUploader: React.FC<Props> = ({
	onUploadImage,
	onRemoveImage,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const classes = useStyles();

	const [image, setImage] = useState('');
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingImage, setLoadingImage] = useState(false);
	const [loadingImageProgress, setLoadingImageProgress] = useState(0);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const valdationResult = validateImage(file);

			if (valdationResult.success) {
				setLoadingImage(true);
				setLoadingImageProgress(0);
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

						setLoadingImageProgress(percentCompleted);
					},
				};
				const {data} = await axios.post(
					String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
					formData,
					config,
				);

				setImage(data.public_id);
				onUploadImage(data.public_id);

				setLoadingImage(false);
				onLoadingFinish();
			} else {
				enqueueSnackbar(valdationResult.message, {variant: 'error'});
			}
		}
	};

	const _handleRemoveImage = async (): Promise<void> => {
		if (!image) {
			return;
		}

		setLoading(true);
		onLoadingStart();

		const data = await callApi.delete(`/cloud?public_id=${image}`);

		if (data.success) {
			setImage('');
			onRemoveImage();
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
		onLoadingFinish();
	};

	return (
		<div className={classes.root}>
			{image ? (
				<Button
					color='secondary'
					variant='contained'
					endIcon={<DeleteIcon />}
					onClick={_handleRemoveImage}
					disabled={loading || loadingImage}
					className={classes.button}
				>
					Remove image
				</Button>
			) : (
				<Button
					color='primary'
					variant='contained'
					endIcon={<BackupIcon />}
					component='label'
					disabled={loading || loadingImage}
					className={classes.button}
				>
					Upload image
					<input type='file' style={{display: 'none'}} onChange={_handleChangeImage} />
				</Button>
			)}

			{loadingImage && <CircularProgressWithLabel value={loadingImageProgress} />}

			{!loadingImage && image && (
				<CardActionArea
					disabled={loading}
					className={classes.imageWrapper}
					onClick={(): void => setImageModal(true)}
				>
					<img
						alt=''
						src={`${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${image}`}
						className={classes.image}
					/>

					{loading && (
						<div className={classes.loadingBox}>
							<Loader />
						</div>
					)}
				</CardActionArea>
			)}

			<ImageModal
				open={imageModal}
				image={`${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${image}`}
				closeModal={(): void => setImageModal(false)}
			/>
		</div>
	);
};

export default ImageUploader;
