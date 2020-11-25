import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';
import axios from 'axios';

import {addAvatar, removeAvatar} from '@store/auth/actions';
import {userInitials} from '@utils/users';
import {validateImage} from '@utils/media';
import {ImageModal} from '@components/common/modals';
import {CircularProgressWithLabel} from '@components/common/loaders';
import Context from '@screens/User/context';

const useStyles = makeStyles({
	root: {
		width: 240,
		height: 240,
		marginBottom: 20,
		position: 'relative',
	},
	avatar: {
		width: '100%',
		height: '100%',
		fontSize: 60,
		overflow: 'hidden',
	},
	addAvatar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		backgroundColor: 'rgba(0, 0, 0, .6)',
	},
	loadingBox: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, .6)',
		zIndex: 10,
		borderRadius: 4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const UserAvatar: React.FC = () => {
	const classes = useStyles();

	const [actionButton, setActionButton] = useState(false);
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingProcess, setLoadingProgress] = useState(0);

	const {auth, user} = useContext(Context);

	const dispatch = useDispatch();

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		setLoading(true);

		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const validationResult = validateImage(file);

			if (validationResult.success) {
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

				await dispatch(addAvatar(data.public_id));

				setLoading(false);
			} else {
				setLoading(false);
				enqueueSnackbar(validationResult.message, {variant: 'error'});
			}
		}
	};

	const handleRemoveImage = async (image: string): Promise<void> => {
		setLoading(true);

		await dispatch(removeAvatar(auth.user._id, image.split('/').reverse()[0]));

		setLoading(false);
	};

	const isMe = auth.user._id === user._id;
	const allAvatars = isMe ? auth.user.avatar.images : user.avatar.images;
	const currentAvatar = isMe ? auth.user.avatar.images[0] : user.avatar.images[0];

	return (
		<div
			className={classes.root}
			onMouseEnter={(): void => setActionButton(true)}
			onMouseLeave={(): void => setActionButton(false)}
		>
			<Avatar
				variant='rounded'
				className={classNames(classes.avatar, 'avatar')}
				style={{backgroundColor: user.avatar.color, cursor: currentAvatar ? 'pointer' : 'default'}}
				onClick={(): void => setImageModal(true)}
				src={
					currentAvatar
						? `${process.env.REACT_APP_CLOUD_IMAGE_URI}/c_fill,h_200,w_200,q_65/${currentAvatar}`
						: ''
				}
			>
				{userInitials(user)}
			</Avatar>

			<ImageModal
				open={imageModal && isMe}
				images={allAvatars.map(
					(avatar: string) => `${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${avatar}`,
				)}
				handleRemoveImage={handleRemoveImage}
				loading={loading}
				closeModal={(): void => setImageModal(false)}
			/>

			<ImageModal
				open={imageModal && !isMe}
				images={allAvatars.map(
					(avatar: string) => `${process.env.REACT_APP_CLOUD_IMAGE_URI}/q_65/${avatar}`,
				)}
				closeModal={(): void => setImageModal(false)}
			/>

			{loading && (
				<div className={classes.loadingBox}>
					<CircularProgressWithLabel value={loadingProcess} />
				</div>
			)}

			{isMe && !loading && (
				<Grow in={actionButton}>
					<div className={classes.addAvatar}>
						<IconButton color='primary' component='label'>
							<AddAPhotoIcon />

							<input type='file' style={{display: 'none'}} onChange={_handleChangeImage}></input>
						</IconButton>
					</div>
				</Grow>
			)}
		</div>
	);
};

export default UserAvatar;
