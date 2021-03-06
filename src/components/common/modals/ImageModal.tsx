import React, {useState, useEffect} from 'react';
import Lightbox from 'react-image-lightbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import 'react-image-lightbox/style.css';

export const downloadImage = async (imageUrl: string): Promise<void> => {
	const response = await fetch(imageUrl);

	const blob = await response.blob();

	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = '';
	a.click();
};

const useStyles = makeStyles({
	loadingBackdrop: {
		zIndex: 10001,
	},
});

type Props = {
	open: boolean;
	image?: string;
	images?: string[];
	currentImage?: number;
	imageTitle?: string;
	imageCaption?: string;
	loading?: boolean;
	handleRemoveImage?: (imageUrl: string) => void;
	closeModal: () => void;
};

const ImageModal: React.FC<Props> = ({
	open,
	image,
	images,
	currentImage = 0,
	imageTitle,
	imageCaption,
	loading,
	handleRemoveImage,
	closeModal,
}) => {
	const classes = useStyles();

	const [photoIndex, setPhotoIndex] = useState(0);

	useEffect(() => {
		setPhotoIndex(currentImage);
	}, [currentImage]);

	useEffect(() => {
		if (images) {
			if (photoIndex !== 0 && !images[photoIndex]) {
				setPhotoIndex(photoIndex - 1);
			}
		}
	}, [images, photoIndex]);

	if (!open) {
		return null;
	}

	if (!image && images && !images.length) {
		closeModal();
	}

	if (image) {
		return (
			<>
				{loading && (
					<Backdrop open={loading} className={classes.loadingBackdrop}>
						<CircularProgress color='primary' />
					</Backdrop>
				)}

				<Lightbox
					mainSrc={image}
					onCloseRequest={closeModal}
					reactModalStyle={{
						overlay: {
							zIndex: 10000,
						},
					}}
					enableZoom
					toolbarButtons={[
						<IconButton
							color='primary'
							onClick={() => {
								downloadImage(image);
							}}
						>
							<GetAppIcon />
						</IconButton>,
						handleRemoveImage && (
							<Button variant='outlined' color='secondary' onClick={() => handleRemoveImage(image)}>
								Remove
							</Button>
						),
					]}
					imageTitle={imageTitle}
					imageCaption={imageCaption}
				/>
			</>
		);
	}

	if (images) {
		return (
			<>
				{loading && (
					<Backdrop open={loading} className={classes.loadingBackdrop}>
						<CircularProgress color='primary' />
					</Backdrop>
				)}

				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onMovePrevRequest={() => {
						setPhotoIndex((photoIndex + images.length - 1) % images.length);
					}}
					onMoveNextRequest={() => {
						setPhotoIndex((photoIndex + 1) % images.length);
					}}
					onCloseRequest={closeModal}
					reactModalStyle={{
						overlay: {
							zIndex: 10000,
						},
					}}
					enableZoom
					toolbarButtons={[
						<IconButton
							color='primary'
							onClick={() => {
								downloadImage(images[photoIndex]);
							}}
						>
							<GetAppIcon />
						</IconButton>,
						handleRemoveImage && (
							<IconButton color='secondary' onClick={() => handleRemoveImage(images[photoIndex])}>
								<DeleteOutlineIcon />
							</IconButton>
						),
					]}
					imageCaption={`${photoIndex + 1} of ${images.length}`}
				/>
			</>
		);
	}

	return null;
};

export default ImageModal;
