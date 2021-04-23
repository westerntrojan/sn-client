import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import {useStyles} from './MyMessageStyle';
import {IMessage} from '@/components/common/chats/types';
import DayMeta from '@/components/common/chats/DayMeta';

type Props = {
	message: IMessage;
	alterHeader: boolean;
	selectMessage: (messageId: string) => void;
	showDate?: boolean;
};

const MyMessage: React.FC<Props> = ({message, alterHeader, selectMessage, showDate}) => {
	const classes = useStyles();

	const [isSelect, setIsSelect] = useState(false);
	const [checkIcon, setCheckIcon] = useState(false);

	useEffect(() => {
		if (!alterHeader) {
			setIsSelect(false);
		}
	}, [alterHeader]);

	const handleSelect = () => {
		const selection = window.getSelection()?.toString();
		if (selection) return;

		setIsSelect(!isSelect);
		selectMessage(message._id);
	};

	return (
		<div>
			{showDate && <DayMeta date={message.created} />}

			<Paper
				className={classNames('my-message', classes.message, {
					[classes.selectedRoot]: isSelect,
				})}
				onClick={handleSelect}
				onMouseEnter={() => setCheckIcon(true)}
				onMouseLeave={() => setCheckIcon(false)}
			>
				<CheckCircleIcon
					color='primary'
					className={classNames(classes.checkIcon, {
						[classes.hoverCheckIcon]: checkIcon,
						[classes.activeCheckIcon]: isSelect,
					})}
				/>

				<Card>
					<CardContent>
						<Typography>{message.text}</Typography>
					</CardContent>

					<CardActions className={classes.cardActions}>
						<div className={classes.info}>
							<Typography variant='caption'>{moment(message.created).format('LT')}</Typography>
						</div>
					</CardActions>
				</Card>
			</Paper>
		</div>
	);
};

export default MyMessage;
