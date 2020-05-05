import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import {userAvatar} from '@utils/users';
import {IUser} from '@store/types';

type Props = {
	user: IUser;
	className?: any;
	style?: object;
	onClick?: (...args: any) => any;
};

const UserAvatar: React.FC<Props> = ({user, className = '', style, onClick}) => {
	return (
		<Avatar
			className={classNames('avatar', className)}
			src={user.avatar.images[0]}
			style={{backgroundColor: user.avatar.color, ...style}}
			onClick={onClick}
		>
			{userAvatar(user)}
		</Avatar>
	);
};

export default UserAvatar;
