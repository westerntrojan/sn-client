import React, {useState} from 'react';
import Lightbox from 'react-image-lightbox';
import Button from '@material-ui/core/Button';
import 'react-image-lightbox/style.css';

type Props = {
	image?: string;
	images?: string[];
	handleRemoveImage?: (imageUrl: string) => void;
	closeModal: () => void;
};

const ImageModal: React.FC<Props> = ({image, images, handleRemoveImage, closeModal}) => {
	const [photoIndex, setPhotoIndex] = useState(0);

	if (!image && images && !images.length) {
		closeModal();
	}

	if (image) {
		return (
			<Lightbox
				mainSrc={image}
				onCloseRequest={closeModal}
				enableZoom
				reactModalStyle={{
					overlay: {
						zIndex: 100000,
					},
				}}
				toolbarButtons={[
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
			/>
		);
	}

	if (images) {
		return (
			<Lightbox
				mainSrc={images[photoIndex]}
				nextSrc={images[(photoIndex + 1) % images.length]}
				prevSrc={images[(photoIndex + images.length - 1) % images.length]}
				onCloseRequest={closeModal}
				onMovePrevRequest={(): void => {
					setPhotoIndex((photoIndex + images.length - 1) % images.length);
				}}
				onMoveNextRequest={(): void => {
					setPhotoIndex((photoIndex + 1) % images.length);
				}}
				enableZoom
				reactModalStyle={{
					overlay: {
						zIndex: 100000,
					},
				}}
				imageCaption={`${photoIndex + 1} of ${images.length}`}
				toolbarButtons={[
					handleRemoveImage && (
						<Button
							variant='outlined'
							color='secondary'
							onClick={(): void => handleRemoveImage(images[photoIndex])}
						>
							Remove
						</Button>
					),
				]}
			/>
		);
	}

	return null;
};

export default ImageModal;
