import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import {LinearProgressWithLabel} from '@/components/common/loaders';
import ImageGrid from '@/components/common/ImageGrid';
import {getImageLink} from '@/utils/media';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	button: {
		marginRight: 20,
	},
	preview: {
		maxWidth: 800,
	},
	loadingBox: {
		marginTop: 20,
	},
	loadingItem: {
		display: 'flex',
		alignItems: 'center',
	},
	loader: {
		marginRight: 20,
		width: 200,
	},
});

type Props = {
	onUploadImages: (image: string[]) => void;
	// onRemoveImage: () => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const ImageUploader: React.FC<Props> = ({
	onUploadImages,
	// onRemoveImage,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const classes = useStyles();

	const [images, setImages] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [loadingImages, setLoadingImages] = useState(false);
	const [loadingImageProgress, setLoadingImageProgress] = useState(0);

	const uploadImage = async (file: File): Promise<void> => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
		if (process.env.NODE_ENV !== 'production') {
			formData.append('folder', 'test');
		}

		const config = {
			onUploadProgress: (progressEvent: {loaded: number; total: number}) => {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

				setLoadingImageProgress(percentCompleted);
			},
		};
		const {data} = await axios.post(
			String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
			formData,
			config,
		);

		setImages(images.concat(data.public_id));
		setLoadingImageProgress(0);
	};

	useEffect(() => {
		if (files.length > 0) {
			(async (): Promise<void> => {
				setLoadingImages(true);
				onLoadingStart();

				await uploadImage(files[0]);

				setFiles(files.filter((_, index) => index !== 0));
			})();
		} else {
			setLoadingImages(false);
			onLoadingFinish();

			if (images.length) {
				onUploadImages(images);
			}
		}

		// eslint-disable-next-line
	}, [files]);

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setFiles([...e.target.files].slice(0, 5));
		}
	};

	return (
		<div className={classes.root}>
			<Button
				color='primary'
				variant='contained'
				endIcon={<ImageIcon />}
				component='label'
				disabled={loadingImages || images.length >= 5}
				className={classes.button}
			>
				Upload images
				<input type='file' style={{display: 'none'}} onChange={_handleChangeImage} multiple />
			</Button>

			<div className={classes.preview}>
				{!!images.length && (
					<ImageGrid images={images.map(image => getImageLink({imageId: image}))} />
				)}

				{loadingImages && (
					<div className={classes.loadingBox}>
						{files.map((file, index) => (
							<div className={classes.loadingItem} key={file.name}>
								<LinearProgressWithLabel
									value={index === 0 ? loadingImageProgress : 0}
									className={classes.loader}
								/>
								<Typography>{file.name}</Typography>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUploader;

// const _handleRemoveImage = async (): Promise<void> => {
// 	if (!image) {
// 		return;
// 	}

// 	setLoading(true);
// 	onLoadingStart();

// 	const data = await callApi.delete(`/cloud/image?public_id=${image}`);

// 	if (data.success) {
// 		setImage('');
// 		onRemoveImage();
// 	} else {
// 		enqueueSnackbar(data.message, {variant: 'error'});
// 	}

// 	setLoading(false);
// 	onLoadingFinish();
// };
