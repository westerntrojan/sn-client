import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {Image, Transformation} from 'cloudinary-react';
import {useSnackbar} from 'notistack';

import callApi from '@utils/callApi';
import {ImageModal} from '@components/modals';

const useStyles = makeStyles(theme => ({
	loadingBackdrop: {
		zIndex: theme.zIndex.drawer + 3,
	},
	content: {
		display: 'flex',
		alignItems: 'flex-start',
	},
	inputs: {
		marginRight: 20,
		display: 'flex',
		flexDirection: 'column',

		'& input:first-child': {
			marginBottom: 20,
		},
	},
}));

const Test: React.FC = () => {
	const classes = useStyles();

	const [image, setImage] = useState('');
	const [publicId, setPublicId] = useState('');
	const [imageModal, setImageModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const {enqueueSnackbar} = useSnackbar();

	const _handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (e.target.files && e.target.files.length) {
			setLoading(true);

			const file = e.target.files[0];

			const formData = new FormData();
			formData.append('image', file);

			const data = await callApi.post('/test', formData);

			if (data.success) {
				setImage(data.image);
			} else {
				enqueueSnackbar(data.message, {variant: 'error'});
			}

			setLoading(false);
		}
	};

	const _handleChangePublicId = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPublicId(e.target.value);
	};

	const _handleSubmit = async (): Promise<void> => {
		if (!publicId.trim()) {
			return;
		}

		setLoading(true);

		const data = await callApi.delete(`/test/${publicId}`);

		if (data.success) {
			enqueueSnackbar('Image success removed', {variant: 'success'});

			setPublicId('');
		} else {
			enqueueSnackbar(data.message, {variant: 'error'});
		}

		setLoading(false);
	};

	const _handleKeyPressInput = (target: React.KeyboardEvent): void => {
		if (target.charCode === 13) {
			_handleSubmit();
		}
	};

	return (
		<section className='test'>
			<Helmet>
				<title>Test / {process.env.REACT_APP_TITLE}</title>
			</Helmet>

			<Backdrop open={loading} className={classes.loadingBackdrop}>
				<CircularProgress color='primary' />
			</Backdrop>

			<div className={classes.content}>
				<div className={classes.inputs}>
					<input type='file' onChange={_handleChangeImage} />

					<input
						type='text'
						placeholder='public_id'
						value={publicId}
						onChange={_handleChangePublicId}
						onKeyPress={_handleKeyPressInput}
					/>
				</div>

				{image && (
					<>
						<Image
							cloudName={process.env.REACT_APP_CLOUD_NAME}
							publicId={image}
							secure='true'
							alt={image}
							fetchFormat='auto'
							onClick={(): void => setImageModal(true)}
							style={{cursor: 'pointer'}}
						>
							<Transformation width='400' height='300' crop='fill' />
							<Transformation quality='65' />
							<Transformation effect='oil_paint:70' />
						</Image>
					</>
				)}
			</div>

			<ImageModal
				open={imageModal}
				image={`${process.env.REACT_APP_CLOUD_URI}/q_65/${image}`}
				closeModal={(): void => setImageModal(false)}
			/>
		</section>
	);
};

export default Test;

// effect='outline:15:200'
// color='orange'
// background='auto:predominant'
// effect='gradient_fade:symmetric_pad'
// background='black'
// opacity='60'
// effect='brightness:200'
// x='355'
// y='410'
// aspectRatio="4:3"
// flags='lossy'
// quality='auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best'
// angle='10'
// radius='max'
