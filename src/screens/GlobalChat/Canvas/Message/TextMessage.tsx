import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import {IMessage} from '@/components/common/chats/types';
import {userLink} from '@/utils/users';

const useStyles = makeStyles({
	username: {
		marginBottom: '5px',
		position: 'relative',
		opacity: '.8',
		display: 'inline-block',
	},
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
				<Link underline='none' component={RouterLink} to={userLink(message.user)} color='inherit'>
					<Typography variant='caption' className={classes.username}>
						{`${message.user.firstName} ${message.user.lastName}`.trim()}
					</Typography>
				</Link>
				<Typography>{message.text}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.info}>
					{message.edited && (
						<Typography variant='caption' style={{marginRight: 10}}>
							edited
						</Typography>
					)}

					<Typography variant='caption' style={{margin: 0}}>
						{moment(message.created).format('LT')}
					</Typography>
				</div>
			</CardActions>
		</Card>
	);
};

export default TextMessage;
