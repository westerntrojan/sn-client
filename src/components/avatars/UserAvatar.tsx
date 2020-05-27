import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

import {userAvatar} from '@utils/users';
import {IUser} from '@store/types';

const useStyles = makeStyles(theme => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		fontSize: 12,
	},
}));

type Props = {
	user: IUser;
	className?: any;
	small?: boolean;
	style?: object;
	onClick?: (...args: any) => any;
};

const UserAvatar: React.FC<Props> = ({user, className = '', small = false, style, onClick}) => {
	const classes = useStyles();

	return (
		<Avatar
			className={classNames('avatar', className, {[classes.small]: small})}
			src={user.avatar.images[0]}
			style={{backgroundColor: user.avatar.color, ...style}}
			onClick={onClick}
		>
			{userAvatar(user)}
		</Avatar>
	);
};

export default UserAvatar;
