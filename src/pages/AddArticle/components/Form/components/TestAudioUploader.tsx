import React, {useState, useRef} from 'react';
import {makeStyles} from '@material-ui/styles';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Button from '@material-ui/core/Button';
import {useSnackbar} from 'notistack';

import {IAudioTrack} from '@store/types';
import UploadFile from './UploadFile';
import {validateAudio} from '@utils/audio';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	button: {
		marginRight: 20,
	},
	uploadList: {
		display: 'flex',
		flexDirection: 'column',
	},
});

type Props = {
	onUploadAudio: (audioTrack: IAudioTrack) => void;
	onRemoveAudio: (publicId: string) => void;
	onLoadingStart: () => void;
	onLoadingFinish: () => void;
};

const TestAudioUploader: React.FC<Props> = ({
	onUploadAudio,
	onRemoveAudio,
	onLoadingStart,
	onLoadingFinish,
}) => {
	const classes = useStyles();

	const [files, setFiles] = useState<File[]>([]);
	const [uploadedFiles, setUploadedFiles] = useState<IAudioTrack[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const {enqueueSnackbar} = useSnackbar();

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length) {
			const targetFiles = [...e.target.files];

			setFiles(
				targetFiles.filter(file => {
					const validationResult = validateAudio(file);

					if (validationResult.success) {
						return file;
					}

					enqueueSnackbar(validationResult.message, {variant: 'error'});

					return null;
				}),
			);

			if (inputRef.current) {
				inputRef.current.value = '';
			}
		}
	};

	const handleRemoveFile = (filename: string): void => {
		setFiles(files.filter((file: File) => file.name !== filename));

		onRemoveAudio(filename);
	};

	const handleUploadFile = (audio: IAudioTrack): void => {
		setUploadedFiles(uploadedFiles.concat(audio));

		onUploadAudio(audio);
	};

	return (
		<div className={classes.root}>
			<Button
				color='primary'
				variant='contained'
				endIcon={<MusicNoteIcon />}
				component='label'
				className={classes.button}
			>
				Upload audio
				<input
					type='file'
					ref={inputRef}
					style={{display: 'none'}}
					onChange={handleChangeFile}
					multiple
				/>
			</Button>

			<div className={classes.uploadList}>
				{files.map(file => (
					<UploadFile
						key={file.name}
						file={file}
						onUploadFile={handleUploadFile}
						onRemoveFile={handleRemoveFile}
					/>
				))}
			</div>
		</div>
	);
};

export default TestAudioUploader;
