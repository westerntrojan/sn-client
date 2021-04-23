import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CardActionArea from '@material-ui/core/CardActionArea';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';

import {ImageModal} from '@/components/common/modals';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		height: 700,
	},
	gallery: {
		flex: 1,
		'& .react-swipeable-view-container': {
			height: '100%',
		},
	},
	imageWrapper: {
		height: '100%',
	},
	image: {
		width: '100%',
		height: '100%',
		display: 'block',
		overflow: 'hidden',
		objectFit: 'cover',
	},
	mobileStepper: {
		backgroundColor: theme.palette.background.paper,
	},
}));

type Props = {
	images: string[];
	withModal?: boolean;
};

const ImageGallery: React.FC<Props> = ({images, withModal = false}) => {
	const classes = useStyles();
	const theme = useTheme();

	const [activeStep, setActiveStep] = useState(0);
	const [imageModal, setImageModal] = useState(false);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	const _handleClickImage = () => {
		if (withModal) {
			setImageModal(true);
		}
	};

	return (
		<div className={classes.root}>
			<AutoPlaySwipeableViews
				index={activeStep}
				onChangeIndex={handleStepChange}
				className={classes.gallery}
				// enableMouseEvents
			>
				{images.map((Image, index) => (
					<CardActionArea key={Image} className={classes.imageWrapper} onClick={_handleClickImage}>
						{Math.abs(activeStep - index) <= 2 ? (
							<img
								className={classes.image}
								src={Image}
								style={{cursor: withModal ? 'pointer' : 'default'}}
								alt=''
							/>
						) : null}
					</CardActionArea>
				))}
			</AutoPlaySwipeableViews>

			{images.length > 1 && (
				<MobileStepper
					steps={maxSteps}
					position='static'
					variant='dots'
					activeStep={activeStep}
					className={classes.mobileStepper}
					nextButton={
						<Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
							Next
							{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
						</Button>
					}
					backButton={
						<Button size='small' onClick={handleBack} disabled={activeStep === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
							Back
						</Button>
					}
				/>
			)}

			<ImageModal
				open={imageModal}
				closeModal={() => setImageModal(false)}
				images={images}
				currentImage={activeStep}
			/>
		</div>
	);
};

export default ImageGallery;
