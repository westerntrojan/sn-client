import React, {useState} from 'react';
import Lightbox from 'react-image-lightbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import 'react-image-lightbox/style.css';

type Props = {
	image?: string;
	images?: string[];
	imageTitle?: string;
	imageCaption?: string;
	handleRemoveImage?: (imageUrl: string) => void;
	closeModal: () => void;
};

const ImageModal: React.FC<Props> = ({
	image,
	images,
	imageTitle = '',
	imageCaption = '',
	handleRemoveImage,
	closeModal,
}) => {
	const [photoIndex, setPhotoIndex] = useState(0);

	if (!image && images && !images.length) {
		closeModal();
	}

	if (image) {
		return (
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
					<IconButton color='primary'>
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
		);
	}

	if (images) {
		return (
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
					<a href={images[photoIndex]} download='image'>
						<IconButton color='primary'>
							<GetAppIcon />
						</IconButton>
					</a>,
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
		);
	}

	return null;
};

export default ImageModal;
