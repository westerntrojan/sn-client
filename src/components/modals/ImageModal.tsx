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

import {downloadImage} from '@utils/images';

const useStyles = makeStyles({
	loadingBackdrop: {
		zIndex: 10001,
	},
});

type Props = {
	open: boolean;
	image?: string;
	images?: string[];
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
	imageTitle,
	imageCaption,
	loading,
	handleRemoveImage,
	closeModal,
}) => {
	const classes = useStyles();

	const [photoIndex, setPhotoIndex] = useState(0);

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
							onClick={(): void => {
								downloadImage(image);
							}}
						>
							<GetAppIcon />
						</IconButton>,
						handleRemoveImage && (
							<Button
								variant='outlined'
								color='secondary'
								onClick={(): void => handleRemoveImage(image)}
							>
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
					onMovePrevRequest={(): void => {
						setPhotoIndex((photoIndex + images.length - 1) % images.length);
					}}
					onMoveNextRequest={(): void => {
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
							onClick={(): void => {
								downloadImage(images[photoIndex]);
							}}
						>
							<GetAppIcon />
						</IconButton>,
						handleRemoveImage && (
							<IconButton
								color='secondary'
								onClick={(): void => handleRemoveImage(images[photoIndex])}
							>
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
