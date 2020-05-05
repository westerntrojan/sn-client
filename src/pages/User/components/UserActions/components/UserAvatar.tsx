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

		if (e.target.files) {
			const formData = new FormData();
			formData.append('userId', auth.user._id);
			formData.append('avatar', e.target.files[0]);

			const error: any = await dispatch(addAvatar(formData));

			setLoading(false);

			if (error) {
				enqueueSnackbar(error.msg, {variant: 'error'});
			}
		}
	};

	const handleRemoveImage = async (imageUrl: string): Promise<void> => {
		await dispatch(removeAvatar(auth.user._id, imageUrl));
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
				src={currentAvatar}
			>
				{userAvatar(user)}
			</Avatar>

			{imageModal && isMe && (
				<ImageModal
					images={allAvatars}
					handleRemoveImage={handleRemoveImage}
					closeModal={(): void => setImageModal(false)}
				/>
			)}

			{imageModal && !isMe && (
				<ImageModal images={allAvatars} closeModal={(): void => setImageModal(false)} />
			)}

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
