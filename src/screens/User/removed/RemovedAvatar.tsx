import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
	avatar: {
		width: 200,
		height: 200,
		marginRight: 20,
	},
	icon: {
		width: '100%',
		height: '100%',
	},
});

const RemovedAvatar: React.FC = () => {
	const classes = useStyles();

	return (
		<Avatar className={classNames(classes.avatar, 'avatar')} variant='rounded'>
			<AccountBoxIcon className={classes.icon} />
		</Avatar>
	);
};

export default RemovedAvatar;
