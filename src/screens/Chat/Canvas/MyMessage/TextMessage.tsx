import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import moment from 'moment';

import {IMessage} from '@components/common/chats/types';

const useStyles = makeStyles({
	cardActions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	info: {
		display: 'flex',
		alignItems: 'center',
		opacity: 0.8,
	},
});

type Props = {
	message: IMessage;
};

const TextMessage: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	return (
		<Card>
			<CardContent>
				<Typography>{message.text}</Typography>
			</CardContent>

			<CardActions className={classes.cardActions}>
				<div className={classes.info}>
					{message.edited && (
						<Typography variant='caption' style={{marginRight: 10}}>
							edited
						</Typography>
					)}

					<Typography variant='caption' style={{marginRight: 10}}>
						{moment(message.created).format('LT')}
					</Typography>

					{message.isRead ? <DoneAllIcon fontSize='small' /> : <DoneIcon fontSize='small' />}
				</div>
			</CardActions>
		</Card>
	);
};

export default TextMessage;
