import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';

type Props = {
	onUploadImages: (image: string[]) => void;
	// onRemoveImage: () => void;
	onUploadVideo: (video: string) => void;
	onRemoveVideo: () => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const MediaUploader: React.FC<Props> = ({
	onUploadImages,
	// onRemoveImage,
	onUploadVideo,
	onRemoveVideo,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const [uploadType, setUploadType] = useState(0);
	const [images, setImages] = useState<string[]>([]);
	const [video, setVideo] = useState('');
	const [loading, setLoading] = useState(false);

	const _handleChangeUploadType = (event: React.ChangeEvent<{}>, newValue: number): void => {
		setUploadType(newValue);
	};

	const _handleUploadImages = (images: string[]): void => {
		setImages(images);
		onUploadImages(images);
	};

	// const _handleRemoveImage = (): void => {
	// 	setImage('');
	// 	onRemoveImage();
	// };

	const _handleUploadVideo = (video: string): void => {
		setVideo(video);
		onUploadVideo(video);
	};

	const _handleRemoveVideo = (): void => {
		setVideo('');
		onRemoveVideo();
	};

	const _handleLoadingStart = (): void => {
		setLoading(true);
		onLoadingStart();
	};

	const _handleLoadingFinish = (): void => {
		setLoading(false);
		onLoadingFinish();
	};

	return (
		<div>
			<Tabs
				value={uploadType}
				onChange={_handleChangeUploadType}
				indicatorColor='primary'
				textColor='primary'
			>
				<Tab label='Upload images' disabled={!!video || loading} />
				<Tab label='Upload video' disabled={!!images.length || loading} />
			</Tabs>

			<div style={{paddingTop: 20}}>
				{uploadType === 0 && (
					<ImageUploader
						onUploadImages={_handleUploadImages}
						// onRemoveImage={_handleRemoveImage}
						onLoadingStart={_handleLoadingStart}
						onLoadingFinish={_handleLoadingFinish}
					/>
				)}
				{uploadType === 1 && (
					<VideoUploader
						onUploadVideo={_handleUploadVideo}
						onRemoveVideo={_handleRemoveVideo}
						onLoadingStart={_handleLoadingStart}
						onLoadingFinish={_handleLoadingFinish}
					/>
				)}
			</div>
		</div>
	);
};

export default MediaUploader;
