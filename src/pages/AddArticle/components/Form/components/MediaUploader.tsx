import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';

type Props = {
	onUploadImage: (image: string) => void;
	onRemoveImage: () => void;
	onUploadVideo: (video: string) => void;
	onRemoveVideo: () => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const MediaUploader: React.FC<Props> = ({
	onUploadImage,
	onRemoveImage,
	onUploadVideo,
	onRemoveVideo,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const [uploadType, setUploadType] = useState(0);
	const [image, setImage] = useState('');
	const [video, setVideo] = useState('');
	const [loading, setLoading] = useState(false);

	const _handleChangeUploadType = (event: React.ChangeEvent<{}>, newValue: number): void => {
		setUploadType(newValue);
	};

	const _handleUploadImage = (image: string): void => {
		setImage(image);
		onUploadImage(image);
	};

	const _handleRemoveImage = (): void => {
		setImage('');
		onRemoveImage();
	};

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
				<Tab label='Upload image' disabled={!!video || loading} />
				<Tab label='Upload video' disabled={!!image || loading} />
			</Tabs>

			<div style={{paddingTop: 20}}>
				{uploadType === 0 && (
					<ImageUploader
						onUploadImage={_handleUploadImage}
						onRemoveImage={_handleRemoveImage}
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
