import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

import {LinearProgressWithLabel} from '@components/common/loaders';
import {IAudioTrack} from '@store/types';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		marginBottom: 5,

		'&:last-child': {
			margin: 0,
		},
	},
	loader: {
		width: 260,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

type Props = {
	file: File;
	onRemoveFile: (filename: string) => void;
	onUploadFile: (audio: IAudioTrack) => void;
};

const UploadFile: React.FC<Props> = ({file, onUploadFile, onRemoveFile}) => {
	const classes = useStyles();

	const [loadingProgress, setLoadingProgress] = useState(0);

	useEffect(() => {
		const uploadFile = async (): Promise<void> => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', String(process.env.REACT_APP_CLOUD_UPLOAD_PRESET));
			if (process.env.NODE_ENV !== 'production') {
				formData.append('folder', 'test');
			}
			const config = {
				onUploadProgress: (progressEvent: {loaded: number; total: number}): void => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setLoadingProgress(percentCompleted);
				},
			};
			const {data} = await axios.post(
				String(process.env.REACT_APP_CLOUD_UPLOAD_URL),
				formData,
				config,
			);

			onUploadFile({
				filename: file.name,
				publicId: data.public_id,
			});
		};
		uploadFile();

		// eslint-disable-next-line
	}, [file]);

	return (
		<div className={classes.root}>
			<div className={classes.loader}>
				<Typography variant='caption'>{file.name}</Typography>

				<LinearProgressWithLabel value={loadingProgress} />
			</div>

			<IconButton onClick={(): void => onRemoveFile(file.name)}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
};

export default UploadFile;
