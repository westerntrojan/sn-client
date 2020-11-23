import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import {useStyles} from './MyMessageStyle';
import {IMessage} from '@components/common/chats/types';

type Props = {
	message: IMessage;
	alterHeader: boolean;
	selectMessage: (_id: string) => void;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage}) => {
	const classes = useStyles();

	const [isSelect, setIsSelect] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);

	useEffect(() => {
		if (!alterHeader) {
			setIsSelect(false);
		}
	}, [alterHeader]);

	const _handleClickMessage = (): void => {
		setIsSelect(!isSelect);
		selectMessage(message._id);
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

			<Card className={classes.message}>
				<CardContent>
					<Typography>{message.text}</Typography>
				</CardContent>
				<CardActions className={classes.actions}>
					<div className={classes.messageInfo}>
						<Typography className={'small'} style={{marginRight: 10}}>
							{moment(message.created).format('LT')}
						</Typography>

						{message.isRead ? <DoneAllIcon fontSize='small' /> : <DoneIcon fontSize='small' />}
					</div>
				</CardActions>
			</Card>
		</Paper>
	);
};

export default MyMessage;
