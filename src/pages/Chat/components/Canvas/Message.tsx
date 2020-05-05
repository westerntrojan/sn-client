import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classNames from 'classnames';

import UserAvatar from '@components/avatars/UserAvatar';
import {userLink} from '@utils/users';
import {IMessage} from '@pages/Chat/types';

const useStyles = makeStyles(theme => ({
	root: {
		margin: '10px 0',
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
	avatar: {
		marginRight: 10,
	},
	username: {
		fontSize: '14px',
		marginBottom: '5px',
		position: 'relative',
		opacity: '.8',
		display: 'inline-block',
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
			<Link underline='none' component={RouterLink} to={userLink(message.user)} color='inherit'>
				<UserAvatar user={message.user} className={classes.avatar} />
			</Link>
			<Card>
				<CardContent>
					<Link underline='none' component={RouterLink} to={userLink(message.user)} color='inherit'>
						<Typography className={classes.username}>
							{`${message.user.firstName} ${message.user.lastName}`.trim()}
						</Typography>
					</Link>
					<Typography>{message.text}</Typography>
				</CardContent>
				<CardActions className={classes.info}>
					<div className={'buttons'}></div>

					<div className={classes.info}>
						<Typography className={'small'}>{moment(message.created).format('LT')}</Typography>
					</div>
				</CardActions>
			</Card>
		</div>
	);
};

export default Message;
