import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {useStyles} from './style';
import {IMessage} from '@components/chat/types';
import {ImageModal} from '@components/modals';

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
