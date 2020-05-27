import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';

import {IMessage} from '@components/chat/types';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '10px 0',
		padding: '0 20px',
		display: 'flex',
		alignItems: 'flex-end',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
		'& .MuiCard-root': {
			width: 'fit-content',
			borderRadius: '5px',
			minWidth: '200px',
			maxWidth: '100%',
			backgroundColor: theme.palette.background.paper,
			'& .MuiCardContent-root': {
				padding: '5px 10px',
			},
			'& .MuiCardActions-root': {
				padding: '5px 10px',
			},
		},
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
}));

type Props = {
	message: IMessage;
};

const Message: React.FC<Props> = ({message}) => {
	const classes = useStyles();

	return (
		<div className={classNames('message', classes.root)}>
			<Card>
				<CardContent>
					<Typography>{message.text}</Typography>
				</CardContent>
				<CardActions className={classes.info}>
					<div className={classes.info}>
						<Typography className={'small'}>{moment(message.created).format('LT')}</Typography>
					</div>
				</CardActions>
			</Card>
		</div>
	);
};

export default Message;
