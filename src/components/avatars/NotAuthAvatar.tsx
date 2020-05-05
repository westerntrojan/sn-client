import React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

type Props = {
	className?: any;
	style?: object;
	onClick?: (...args: any) => any;
};

const NotAuthAvatar: React.FC<Props> = ({className = '', style, onClick}) => {
	return (
		<Avatar className={classNames('avatar', className)} style={style} onClick={onClick}>
			<PersonIcon />
		</Avatar>
	);
};

export default NotAuthAvatar;
