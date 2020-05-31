import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {IMessage} from '@components/chat/types';
import {ImageModal} from '@components/modals';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '10px 0',
		padding: '0 20px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 0,
		cursor: 'pointer',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		'& .MuiCard-root': {
			width: 'fit-content',
			borderRadius: '5px',
			minWidth: '200px',
			maxWidth: '100%',
			backgroundColor: theme.palette.primary.main,
			'& .MuiCardContent-root': {
				padding: '5px 10px',
			},
			'& .MuiCardActions-root': {
				padding: '5px 10px',
			},
		},
	},
	selectedRoot: {
		backgroundColor: 'rgba(0, 0, 0, .2)',
		'& .MuiCard-root': {
			backgroundColor: 'rgba(0, 0, 0, .3)',
		},
	},
	message: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	imageWrapper: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '0 !important',
	},
	image: {
		maxWidth: 500,
		width: '100%',
	},
	messageCreated: {},
	imageMessageCreated: {
		position: 'absolute',
		color: 'white',
		bottom: 5,
		right: 5,
		backgroundColor: 'rgba(0, 0, 0, .6)',
		borderRadius: 5,
		padding: '2px 5px',
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',

		'& button': {
			marginRight: '10px',
		},
	},
	checkIcon: {
		opacity: 0,
	},
	hoverCheckIcon: {
		opacity: 0.6,
	},
	activeCheckIcon: {
		opacity: 1,
	},
}));

type Props = {
	message: IMessage;
	alterHeader: boolean;
	selectMessage: (_id: string) => void;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage}) => {
	const classes = useStyles();

	const [isSelect, setIsSelect] = useState(false);
	const [imageModal, setImageModal] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);

	useEffect(() => {
		if (!alterHeader) {
			setIsSelect(false);
		}
	}, [alterHeader]);

	const _handleClickMessage = (e: any): void => {
		if (!imageModal) {
			setIsSelect(!isSelect);
			selectMessage(message._id);
		}
	};

	const _handleClickImage = (e: any): void => {
		e.stopPropagation();

		setImageModal(true);
	};

	return (
		<Paper
			className={classNames('my-message', classes.root, {
				[classes.selectedRoot]: isSelect,
			})}
			onClick={_handleClickMessage}
			onMouseEnter={(): void => setCheckIcon(true)}
			onMouseLeave={(): void => setCheckIcon(false)}
		>
			<CheckCircleIcon
				color='primary'
				className={classNames(classes.checkIcon, {
					[classes.hoverCheckIcon]: checkIcon,
					[classes.activeCheckIcon]: isSelect,
				})}
			/>

			{!message.image.url && !message.image.caption && (
				<Card className={classes.message}>
					<CardContent>
						<Typography>{message.text}</Typography>
					</CardContent>
					<CardActions className={classes.actions}>
						<div className={'buttons'}></div>

						<div className={classes.messageCreated}>
							<Typography className={'small'}>{moment(message.created).format('LT')}</Typography>
						</div>
					</CardActions>
				</Card>
			)}

			{message.image.url && !message.image.caption && (
				<Card className={classes.message}>
					<Card className={classes.imageWrapper} onClick={_handleClickImage}>
						<img alt='' src={message.image.url} className={classes.image} />
					</Card>

					<div className={classes.imageMessageCreated}> {moment(message.created).format('LT')}</div>
				</Card>
			)}

			{message.image.url && message.image.caption && (
				<Card className={classes.message}>
					<Card className={classes.imageWrapper} onClick={_handleClickImage}>
						<img alt='' src={message.image.url} className={classes.image} />
					</Card>

					{message.image.caption && (
						<>
							<CardContent>
								<Typography>{message.image.caption}</Typography>
							</CardContent>
							<CardActions className={classes.actions}>
								<div className={classes.messageCreated}>
									<Typography className={'small'}>
										{moment(message.created).format('LT')}
									</Typography>
								</div>
							</CardActions>
						</>
					)}
				</Card>
			)}

			{imageModal && (
				<ImageModal image={message.image.url} closeModal={(): void => setImageModal(false)} />
			)}
		</Paper>
	);
};

export default MyMessage;
