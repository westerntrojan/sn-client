import {IUser} from '@/store/types';

export const userName = (user: IUser): string => {
	const name = `${user.firstName} ${user.lastName}`.trim();

	if (name.length > 10) {
		return name.slice(0, 10) + '...';
	}

	return name;
};

export const userLink = (user: IUser): string => {
	if (user.username) {
		return `/user/${user.username}`;
	}

	return `/user/${user._id}`;
};

export const userInitials = (user: IUser): string => {
	if (user.lastName) {
		return `${user.firstName.slice(0, 1).toUpperCase()}${user.lastName.slice(0, 1).toUpperCase()}`;
	}

	return user.firstName.slice(0, 1).toUpperCase();
};
