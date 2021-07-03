import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

import {userInitials, userLink} from '@/utils/users';
import {IUser} from '@/store/types';
import {getImageLink} from '@/utils/media';

const useStyles = makeStyles(theme => ({
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		fontSize: 12,
	},
}));

type Props = {
	user: IUser;
	className?: string;
	small?: boolean;
	link?: boolean;
	style?: object;
	onClick?: (...args: any) => void;
};

const UserAvatar: React.FC<Props> = ({
	user,
	className = '',
	small = false,
	link = false,
	style,
	onClick,
}) => {
	const classes = useStyles();

	const currentAvatar = !!user.avatar.images.length
		? getImageLink({imageId: user.avatar.images[0], width: 50, height: 50, crop: 'fill'})
		: '';

	if (link) {
		return (
			<Link underline='none' component={RouterLink} to={userLink(user)}>
				<Avatar
					className={classNames('avatar', className, {[classes.small]: small})}
					src={currentAvatar}
					style={{backgroundColor: user.avatar.color, ...style}}
					onClick={onClick}
				>
					{userInitials(user)}
				</Avatar>
			</Link>
		);
	}

	return (
		<Avatar
			className={classNames('avatar', className, {[classes.small]: small})}
			src={currentAvatar}
			style={{backgroundColor: user.avatar.color, ...style}}
			onClick={onClick}
		>
			{userInitials(user)}
		</Avatar>
	);
};

export default UserAvatar;
