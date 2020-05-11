import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import BackupIcon from '@material-ui/icons/Backup';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteIcon from '@material-ui/icons/Delete';

import {ContainedButton} from '@components/SubmitButtons';
import {ImageModal} from '@components/modals';

const useStyles = makeStyles({
	uploader: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	imageWrapper: {
		maxWidth: 300,
		cursor: 'pointer',
		marginLeft: 20,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

type Props = {
	imagePreview: string;
	loadingImage: boolean;
	handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveImage: () => void;
};

const Dropzone: React.FC<Props> = ({
	imagePreview,
	loadingImage,
	handleChangeImage,
	handleRemoveImage,
}) => {
	const classes = useStyles();

	const [imageModal, setImageModal] = useState(false);

	return (
		<div className={classes.uploader}>
			{imagePreview ? (
				<ContainedButton
					endIcon={<DeleteIcon />}
					loading={loadingImage}
					color='secondary'
					onClick={handleRemoveImage}
				>
					Remove image
				</ContainedButton>
			) : (
				<ContainedButton endIcon={<BackupIcon />} component='label' loading={loadingImage}>
					Upload image
					<input type='file' style={{display: 'none'}} onChange={handleChangeImage} />
				</ContainedButton>
			)}

			{imagePreview && (
				<CardActionArea className={classes.imageWrapper} onClick={(): void => setImageModal(true)}>
					<img src={imagePreview} alt='' className={classes.image} />
				</CardActionArea>
			)}

			{imageModal && (
				<ImageModal image={imagePreview} closeModal={(): void => setImageModal(false)} />
			)}
		</div>
	);
};

export default Dropzone;
