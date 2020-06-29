import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';

import {addAvatar, removeAvatar} from '@store/auth/actions';
import {userAvatar} from '@utils/users';
import {validateImage} from '@utils/images';
import {IUser} from '@store/types';
import {ImageModal} from '@components/modals';
import Loader from '@components/Loader';

const useStyles = makeStyles({
	root: {
		width: 200,
		height: 200,
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

type Props = {
	auth: {
		isAuth: boolean;
		isAdmin: boolean;
		user: IUser;
	};
	user: IUser;
};

const UserAvatar: React.FC<Props> = ({auth, user}) => {
	const classes = useStyles();

	const [actionButton, setActionButton] = useState(false);
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		setLoading(true);

		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];

			const checkingResult = validateImage(file);

			if (checkingResult.success) {
				const formData = new FormData();
				formData.append('userId', auth.user._id);
				formData.append('image', file);

				const data: any = await dispatch(addAvatar(formData));

				setLoading(false);

				if (!data.success) {
					enqueueSnackbar(data.message, {variant: 'error'});
				}
			} else {
				setLoading(false);
				enqueueSnackbar(checkingResult.message, {variant: 'error'});
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
				src={`${process.env.REACT_APP_CLOUD_URI}/c_fill,h_200,w_200,q_65/${currentAvatar}`}
			>
				{userAvatar(user)}
			</Avatar>

			<ImageModal
				open={imageModal && isMe}
				images={allAvatars.map(avatar => `${process.env.REACT_APP_CLOUD_URI}/q_65/${avatar}`)}
				handleRemoveImage={handleRemoveImage}
				loading={loading}
				closeModal={(): void => setImageModal(false)}
			/>

			<ImageModal
				open={imageModal && !isMe}
				images={allAvatars.map(avatar => `${process.env.REACT_APP_CLOUD_URI}/q_65/${avatar}`)}
				closeModal={(): void => setImageModal(false)}
			/>

			{loading && (
				<div className={classes.loadingBox}>
					<Loader />
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
